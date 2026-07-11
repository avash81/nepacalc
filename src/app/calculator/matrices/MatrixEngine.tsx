'use client';
import { useMemo, useState, useCallback, useRef } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Calculator as CalcIcon, Layers, Check, Copy, Plus, Trash2, ChevronLeft, HelpCircle, AlertTriangle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

/* ─── Types ─────────────────────────────────────────────────── */
type MatrixData = { id: string; name: string; rows: number; cols: number; cells: number[][] };
type UnaryOp = 'none' | 'det' | 'inv' | 'T' | 'trace' | 'rank';
type MatrixToken = { type: 'matrix'; matrixId: string; unary: UnaryOp };
type OperatorToken = { type: 'operator'; op: '+' | '-' | '×' | '÷' };
type Token = MatrixToken | OperatorToken;

/* ─── Matrix Math Helpers ────────────────────────────────────── */
function makeZero(r: number, c: number): number[][] {
  return Array.from({ length: r }, () => Array(c).fill(0));
}
function makeIdentity(n: number): number[][] {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (__, j) => (i === j ? 1 : 0)));
}
function matAdd(A: number[][], B: number[][]): number[][] | null {
  if (A.length !== B.length || A[0].length !== B[0].length) return null;
  return A.map((row, i) => row.map((v, j) => v + B[i][j]));
}
function matSub(A: number[][], B: number[][]): number[][] | null {
  if (A.length !== B.length || A[0].length !== B[0].length) return null;
  return A.map((row, i) => row.map((v, j) => v - B[i][j]));
}
function matMul(A: number[][], B: number[][]): number[][] | null {
  if (A[0].length !== B.length) return null;
  const R = makeZero(A.length, B[0].length);
  for (let i = 0; i < A.length; i++)
    for (let j = 0; j < B[0].length; j++)
      for (let k = 0; k < A[0].length; k++)
        R[i][j] += A[i][k] * B[k][j];
  return R;
}
function matTranspose(A: number[][]): number[][] {
  return Array.from({ length: A[0].length }, (_, j) => A.map(row => row[j]));
}
function det2(A: number[][]): number { return A[0][0] * A[1][1] - A[0][1] * A[1][0]; }
function determinant(A: number[][]): number {
  const n = A.length;
  if (n === 1) return A[0][0];
  if (n === 2) return det2(A);
  let d = 0;
  for (let j = 0; j < n; j++) {
    const minor = A.slice(1).map(r => r.filter((_, c) => c !== j));
    d += (j % 2 === 0 ? 1 : -1) * A[0][j] * determinant(minor);
  }
  return d;
}
function matInverse(A: number[][]): number[][] | null {
  const n = A.length;
  if (A[0].length !== n) return null;
  const d = determinant(A);
  if (Math.abs(d) < 1e-10) return null;
  // Gauss-Jordan
  const aug: number[][] = A.map((row, i) => [...row, ...makeIdentity(n)[i]]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(aug[r][col]) > Math.abs(aug[pivot][col])) pivot = r;
    [aug[col], aug[pivot]] = [aug[pivot], aug[col]];
    const div = aug[col][col];
    if (Math.abs(div) < 1e-12) return null;
    aug[col] = aug[col].map(v => v / div);
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = aug[r][col];
      aug[r] = aug[r].map((v, c) => v - factor * aug[col][c]);
    }
  }
  return aug.map(row => row.slice(n));
}
function matRank(A: number[][]): number {
  const m = A.map(r => [...r]);
  let rank = 0;
  let row = 0;
  for (let col = 0; col < m[0].length && row < m.length; col++) {
    let pivot = -1;
    for (let r = row; r < m.length; r++) { if (Math.abs(m[r][col]) > 1e-10) { pivot = r; break; } }
    if (pivot === -1) continue;
    [m[row], m[pivot]] = [m[pivot], m[row]];
    const div = m[row][col];
    m[row] = m[row].map(v => v / div);
    for (let r = 0; r < m.length; r++) {
      if (r === row) continue;
      const f = m[r][col];
      m[r] = m[r].map((v, c) => v - f * m[row][c]);
    }
    row++; rank++;
  }
  return rank;
}
function matTrace(A: number[][]): number | null {
  if (A.length !== A[0].length) return null;
  return A.reduce((s, row, i) => s + row[i], 0);
}
function fmt(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return parseFloat(n.toFixed(4)).toString();
}

/* ─── Helpers ────────────────────────────────────────────────── */
function newId() { return Math.random().toString(36).slice(2, 8); }
function nextName(used: string[]): string {
  const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  return names.find(n => !used.includes(n)) ?? `M${used.length}`;
}
function makeMatrix(rows: number, cols: number, name: string): MatrixData {
  return { id: newId(), name, rows, cols, cells: makeZero(rows, cols) };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border border-[#DADCE0] rounded-md bg-white hover:bg-[#E8F0FE] hover:border-[#1A73E8] hover:text-[#1A73E8] transition-all">
      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 border-l-4 border-[#1A73E8] pl-4 mt-8 first:mt-0">
      <Icon className="w-4 h-4 text-[#1A73E8]" />
      <h2 className="text-sm font-black text-[#202124] uppercase tracking-widest">{label}</h2>
    </div>
  );
}

/* ─── Matrix Grid Editor ─────────────────────────────────────── */
function MatrixEditor({ mat, onChange, onDelete, onResize }: {
  mat: MatrixData;
  onChange: (id: string, r: number, c: number, v: number) => void;
  onDelete: (id: string) => void;
  onResize: (id: string, rows: number, cols: number) => void;
}) {
  return (
    <div className="bg-white border border-[#DADCE0] rounded-xl p-4 shadow-sm space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-[#1A73E8] font-mono">{mat.name}</span>
          <span className="text-[10px] font-bold text-[#5F6368] bg-[#F1F3F4] px-2 py-0.5 rounded">{mat.rows}×{mat.cols}</span>
        </div>
        <button onClick={() => onDelete(mat.id)} className="text-[#EA4335] hover:bg-red-50 p-1 rounded transition-colors" title="Remove matrix">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      {/* Dimension controls */}
      <div className="flex items-center gap-3 text-xs">
        <span className="text-[#5F6368] font-bold">Rows:</span>
        <div className="flex items-center gap-1">
          <button onClick={() => onResize(mat.id, Math.max(1, mat.rows - 1), mat.cols)} className="w-6 h-6 rounded border border-[#DADCE0] bg-[#F8F9FA] hover:bg-[#E8F0FE] font-black flex items-center justify-center">−</button>
          <span className="w-6 text-center font-black">{mat.rows}</span>
          <button onClick={() => onResize(mat.id, Math.min(6, mat.rows + 1), mat.cols)} className="w-6 h-6 rounded border border-[#DADCE0] bg-[#F8F9FA] hover:bg-[#E8F0FE] font-black flex items-center justify-center">+</button>
        </div>
        <span className="text-[#5F6368] font-bold">Cols:</span>
        <div className="flex items-center gap-1">
          <button onClick={() => onResize(mat.id, mat.rows, Math.max(1, mat.cols - 1))} className="w-6 h-6 rounded border border-[#DADCE0] bg-[#F8F9FA] hover:bg-[#E8F0FE] font-black flex items-center justify-center">−</button>
          <span className="w-6 text-center font-black">{mat.cols}</span>
          <button onClick={() => onResize(mat.id, mat.rows, Math.min(6, mat.cols + 1))} className="w-6 h-6 rounded border border-[#DADCE0] bg-[#F8F9FA] hover:bg-[#E8F0FE] font-black flex items-center justify-center">+</button>
        </div>
        <button onClick={() => {
          // Clear
          for (let r = 0; r < mat.rows; r++) for (let c = 0; c < mat.cols; c++) onChange(mat.id, r, c, 0);
        }} className="ml-auto text-[10px] text-[#EA4335] font-bold hover:underline">Clear</button>
      </div>
      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1 border-l-4 border-r-4 border-[#202124] rounded px-2 py-1 min-w-0">
          {Array.from({ length: mat.rows }, (_, r) => (
            <div key={r} className="flex gap-1">
              {Array.from({ length: mat.cols }, (_, c) => (
                <input
                  key={c}
                  type="number"
                  value={mat.cells[r]?.[c] ?? 0}
                  onChange={e => onChange(mat.id, r, c, parseFloat(e.target.value) || 0)}
                  aria-label={`${mat.name} row ${r + 1} column ${c + 1}`}
                  className="w-14 h-11 text-center font-mono font-black text-sm border border-[#DADCE0] rounded-lg bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none text-[#202124]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Result Matrix Display ──────────────────────────────────── */
function ResultMatrix({ label, data }: { label: string; data: number[][] }) {
  const text = data.map(r => r.map(fmt).join('\t')).join('\n');
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black text-[#202124] uppercase tracking-wider">{label}</p>
        <CopyButton text={text} />
      </div>
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-0.5 border-l-4 border-r-4 border-[#202124] rounded px-3 py-2 bg-white">
          {data.map((row, r) => (
            <div key={r} className="flex gap-3">
              {row.map((v, c) => (
                <span key={c} className="w-16 text-center font-mono text-sm font-black text-[#202124]">{fmt(v)}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN CALCULATOR ────────────────────────────────────────── */
export default function MatrixEngine({ seoContent }: { seoContent: React.ReactNode }) {
  const [matrices, setMatrices] = useState<MatrixData[]>([
    makeMatrix(2, 2, 'A'),
  ]);
  const [tokens, setTokens] = useState<Token[]>([
    { type: 'matrix', matrixId: matrices[0].id, unary: 'none' },
  ]);
  const [unaryModal, setUnaryModal] = useState<string | null>(null); // matrixId for unary modal

  const matById = useCallback((id: string) => matrices.find(m => m.id === id), [matrices]);

  /* Add matrix */
  const addMatrix = () => {
    const names = matrices.map(m => m.name);
    const name = nextName(names);
    const m = makeMatrix(2, 2, name);
    setMatrices(prev => [...prev, m]);
  };

  /* Insert matrix into expression */
  const insertMatrixToken = (id: string) => {
    setTokens(prev => {
      const last = prev[prev.length - 1];
      if (!last || last.type === 'operator') {
        return [...prev, { type: 'matrix', matrixId: id, unary: 'none' }];
      }
      return prev;
    });
  };

  /* Insert operator */
  const insertOperator = (op: OperatorToken['op']) => {
    setTokens(prev => {
      const last = prev[prev.length - 1];
      if (last && last.type === 'matrix') {
        return [...prev, { type: 'operator', op }];
      }
      return prev;
    });
  };

  /* Remove last token */
  const removeLastToken = () => setTokens(prev => prev.slice(0, -1));

  /* Clear expression */
  const clearExpression = () => setTokens([]);

  /* Set unary on a token */
  const setUnary = (tokenIdx: number, unary: UnaryOp) => {
    setTokens(prev => prev.map((t, i) => i === tokenIdx && t.type === 'matrix' ? { ...t, unary } : t));
  };

  /* Delete matrix */
  const deleteMatrix = (id: string) => {
    setMatrices(prev => prev.filter(m => m.id !== id));
    setTokens(prev => prev.filter((t, i) => {
      if (t.type !== 'matrix' || t.matrixId !== id) return true;
      return false;
    }).filter((t, i, arr) => {
      // Remove orphaned operators
      if (i === 0 && t.type === 'operator') return false;
      if (i === arr.length - 1 && t.type === 'operator') return false;
      if (t.type === 'operator' && arr[i - 1]?.type === 'operator') return false;
      return true;
    }));
  };

  /* Update cell */
  const updateCell = (id: string, r: number, c: number, v: number) => {
    setMatrices(prev => prev.map(m => m.id !== id ? m : {
      ...m,
      cells: m.cells.map((row, ri) => ri !== r ? row : row.map((val, ci) => ci !== c ? val : v))
    }));
  };

  /* Resize matrix */
  const resizeMatrix = (id: string, rows: number, cols: number) => {
    setMatrices(prev => prev.map(m => {
      if (m.id !== id) return m;
      const cells = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => m.cells[r]?.[c] ?? 0)
      );
      return { ...m, rows, cols, cells };
    }));
  };

  /* ── Apply unary op to get result matrix ── */
  function applyUnary(mat: MatrixData, unary: UnaryOp): { value: number[][] | number | null; label: string; error?: string } {
    switch (unary) {
      case 'none': return { value: mat.cells, label: mat.name };
      case 'T': return { value: matTranspose(mat.cells), label: `${mat.name}ᵀ` };
      case 'det': {
        if (mat.rows !== mat.cols) return { value: null, label: `det(${mat.name})`, error: 'Determinant requires a square matrix.' };
        return { value: [[determinant(mat.cells)]], label: `det(${mat.name})` };
      }
      case 'inv': {
        if (mat.rows !== mat.cols) return { value: null, label: `${mat.name}⁻¹`, error: 'Inverse requires a square matrix.' };
        const inv = matInverse(mat.cells);
        return inv ? { value: inv, label: `${mat.name}⁻¹` } : { value: null, label: `${mat.name}⁻¹`, error: 'Matrix is singular (determinant = 0). Inverse does not exist.' };
      }
      case 'trace': {
        const tr = matTrace(mat.cells);
        return tr !== null ? { value: [[tr]], label: `tr(${mat.name})` } : { value: null, label: `tr(${mat.name})`, error: 'Trace requires a square matrix.' };
      }
      case 'rank': return { value: [[matRank(mat.cells)]], label: `rank(${mat.name})` };
      default: return { value: mat.cells, label: mat.name };
    }
  }

  /* ── Evaluate expression ── */
  const evalResult = useMemo(() => {
    if (tokens.length === 0) return null;

    // Resolve each matrix token to a number[][]
    type Resolved = { mat: number[][] | null; label: string; error?: string };
    const resolved: (Resolved | { op: OperatorToken['op'] })[] = tokens.map(t => {
      if (t.type === 'operator') return { op: t.op };
      const mat = matById(t.matrixId);
      if (!mat) return { mat: null, label: '?', error: 'Matrix not found.' };
      const result = applyUnary(mat, t.unary);
      if (typeof result.value === 'number') return { mat: [[result.value]], label: result.label, error: result.error };
      return { mat: result.value as number[][] | null, label: result.label, error: result.error };
    });

    // Check for errors
    for (const r of resolved) {
      if ('error' in r && r.error) return { result: null, error: r.error, label: '' };
      if ('mat' in r && r.mat === null) return { result: null, error: 'One or more operations failed.', label: '' };
    }

    // Evaluate left-to-right
    const items = resolved.filter(r => 'mat' in r) as Resolved[];
    const ops = resolved.filter(r => 'op' in r) as { op: OperatorToken['op'] }[];

    if (items.length === 1) {
      const label = items[0].label;
      return { result: items[0].mat as number[][], label, error: undefined };
    }

    let current = items[0].mat!;
    let label = items[0].label;
    for (let i = 0; i < ops.length; i++) {
      const op = ops[i].op;
      const next = items[i + 1]?.mat;
      if (!next) return { result: null, error: 'Incomplete expression.', label };
      let res: number[][] | null = null;
      if (op === '+') res = matAdd(current, next);
      else if (op === '-') res = matSub(current, next);
      else if (op === '×') res = matMul(current, next);
      else if (op === '÷') {
        const inv = matInverse(next);
        if (!inv) return { result: null, error: 'Cannot divide: right-side matrix is singular or not square.', label };
        res = matMul(current, inv);
      }
      if (!res) return { result: null, error: `Cannot apply ${op}: check matrix dimensions.`, label };
      label += ` ${op} ${items[i + 1].label}`;
      current = res;
    }

    return { result: current, label, error: undefined };
  }, [tokens, matrices]);

  /* ── Individual matrix results ── */
  const individualResults = useMemo(() => {
    return matrices.map(mat => {
      const d = mat.rows === mat.cols ? determinant(mat.cells) : null;
      const tr = mat.rows === mat.cols ? matTrace(mat.cells) : null;
      const rank = matRank(mat.cells);
      const inv = mat.rows === mat.cols && d !== null && Math.abs(d) > 1e-10 ? matInverse(mat.cells) : null;
      const transpose = matTranspose(mat.cells);
      return { mat, det: d, trace: tr, rank, inv, transpose };
    });
  }, [matrices]);

  /* ── Expression display string ── */
  const exprString = tokens.map(t => {
    if (t.type === 'operator') return ` ${t.op} `;
    const mat = matById(t.matrixId);
    if (!mat) return '?';
    const name = mat.name;
    if (t.unary === 'none') return name;
    if (t.unary === 'T') return `${name}ᵀ`;
    if (t.unary === 'det') return `det(${name})`;
    if (t.unary === 'inv') return `${name}⁻¹`;
    if (t.unary === 'trace') return `tr(${name})`;
    if (t.unary === 'rank') return `rank(${name})`;
    return name;
  }).join('');

  const UNARY_OPS: { key: UnaryOp; label: string; desc: string }[] = [
    { key: 'none', label: 'None (as-is)', desc: 'Use matrix values directly.' },
    { key: 'T', label: 'Transpose (Aᵀ)', desc: 'Flip rows and columns.' },
    { key: 'det', label: 'Determinant det(A)', desc: 'Scalar value (square only).' },
    { key: 'inv', label: 'Inverse (A⁻¹)', desc: 'Inverse matrix (square, non-singular).' },
    { key: 'trace', label: 'Trace tr(A)', desc: 'Sum of diagonal (square only).' },
    { key: 'rank', label: 'Rank rank(A)', desc: 'Number of linearly independent rows.' },
  ];

  const inputPanel = (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-bold text-[#5F6368] mb-2">
        <a href="/" className="hover:text-[#1A73E8] transition-colors">Home</a>
        <span>›</span>
        <a href="/engineering/" className="hover:text-[#1A73E8] transition-colors">Engineering Mathematics</a>
        <span>›</span>
        <span className="text-[#202124]">Matrix Calculator</span>
      </nav>

      {/* Matrices */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">Matrices</p>
          <button
            onClick={addMatrix}
            disabled={matrices.length >= 8}
            className="flex items-center gap-1 text-[10px] font-black text-[#1A73E8] hover:bg-[#E8F0FE] px-2 py-1 rounded transition-colors disabled:opacity-40"
          >
            <Plus className="w-3 h-3" /> Add Matrix
          </button>
        </div>
        <div className="space-y-3">
          {matrices.map(mat => (
            <MatrixEditor
              key={mat.id}
              mat={mat}
              onChange={updateCell}
              onDelete={deleteMatrix}
              onResize={resizeMatrix}
            />
          ))}
        </div>
      </div>

      {/* Expression Builder */}
      <div className="space-y-2 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-4">
        <p className="text-[11px] font-black text-[#202124] uppercase tracking-wider">Expression Builder</p>
        {/* Expression display */}
        <div className="min-h-10 bg-white border border-[#DADCE0] rounded-lg px-3 py-2 font-mono text-sm font-black text-[#202124] flex items-center flex-wrap gap-1">
          {tokens.length === 0
            ? <span className="text-[#9AA0A6] font-normal text-xs">Add matrices and operators to build an expression…</span>
            : tokens.map((t, i) => t.type === 'operator'
              ? <span key={i} className="text-[#EA4335] text-base font-black px-1">{t.op}</span>
              : <button key={i}
                  onClick={() => setUnaryModal(`${i}`)}
                  className="text-[#1A73E8] font-black hover:bg-[#E8F0FE] px-1 rounded transition-colors text-sm"
                  title="Click to add operation">
                  {t.unary === 'none' ? matById(t.matrixId)?.name ?? '?'
                    : t.unary === 'T' ? `${matById(t.matrixId)?.name}ᵀ`
                    : t.unary === 'det' ? `det(${matById(t.matrixId)?.name})`
                    : t.unary === 'inv' ? `${matById(t.matrixId)?.name}⁻¹`
                    : t.unary === 'trace' ? `tr(${matById(t.matrixId)?.name})`
                    : t.unary === 'rank' ? `rank(${matById(t.matrixId)?.name})`
                    : matById(t.matrixId)?.name}
                </button>
            )}
        </div>

        {/* Insert matrix buttons */}
        <div>
          <p className="text-[9px] text-[#70757A] font-bold uppercase tracking-wider mb-1">Insert Matrix</p>
          <div className="flex flex-wrap gap-1.5">
            {matrices.map(mat => (
              <button key={mat.id}
                onClick={() => insertMatrixToken(mat.id)}
                className="px-3 py-1.5 bg-white border border-[#1A73E8] rounded-md text-xs font-black text-[#1A73E8] hover:bg-[#E8F0FE] transition-colors">
                {mat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Operator buttons */}
        <div>
          <p className="text-[9px] text-[#70757A] font-bold uppercase tracking-wider mb-1">Insert Operator</p>
          <div className="flex gap-1.5">
            {(['+', '-', '×', '÷'] as const).map(op => (
              <button key={op}
                onClick={() => insertOperator(op)}
                className="w-10 h-10 bg-white border border-[#DADCE0] rounded-lg font-black text-sm text-[#202124] hover:border-[#1A73E8] hover:bg-[#E8F0FE] transition-colors">
                {op}
              </button>
            ))}
            <button onClick={removeLastToken}
              className="px-3 h-10 bg-white border border-[#DADCE0] rounded-lg font-black text-xs text-[#EA4335] hover:bg-red-50 transition-colors">
              ← DEL
            </button>
            <button onClick={clearExpression}
              className="px-3 h-10 bg-white border border-[#DADCE0] rounded-lg font-black text-xs text-[#5F6368] hover:bg-[#F1F3F4] transition-colors">
              AC
            </button>
          </div>
        </div>
        <p className="text-[9px] text-[#9AA0A6]">Tip: Click a matrix in the expression to assign transpose / det / inv / trace / rank.</p>
      </div>

      {/* Unary op modal */}
      {unaryModal !== null && (() => {
        const idx = parseInt(unaryModal);
        const token = tokens[idx];
        if (!token || token.type !== 'matrix') { setUnaryModal(null); return null; }
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setUnaryModal(null)}>
            <div className="bg-white rounded-2xl p-5 shadow-2xl w-72 space-y-3" onClick={e => e.stopPropagation()}>
              <p className="font-black text-[#202124] text-sm">Operation for {matById(token.matrixId)?.name}</p>
              {UNARY_OPS.map(u => (
                <button key={u.key}
                  onClick={() => { setUnary(idx, u.key); setUnaryModal(null); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold border transition-all ${token.unary === u.key ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'border-[#DADCE0] hover:bg-[#F8F9FA]'}`}>
                  <span className="font-black">{u.label}</span>
                  <span className="block text-[#9AA0A6] font-normal mt-0.5">{u.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );

  const resultsPanel = (
    <div className="space-y-5">
      {/* Expression result */}
      {tokens.length > 0 && (
        <div className={`rounded-xl p-5 border ${evalResult?.error ? 'bg-red-50 border-red-200' : 'bg-[#E8F0FE] border-[#1A73E8]/30'}`}>
          <p className="text-[10px] font-black uppercase tracking-wider mb-2 text-[#1A73E8]">Expression Result</p>
          <p className="font-mono text-sm font-black text-[#202124] mb-3">{exprString || '—'}</p>
          {evalResult?.error
            ? <div className="flex items-start gap-2 text-red-700 text-xs font-bold"><AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />{evalResult.error}</div>
            : evalResult?.result
              ? <ResultMatrix label="Result" data={evalResult.result} />
              : <p className="text-xs text-[#9AA0A6]">Build an expression to see the result.</p>
          }
        </div>
      )}

      {/* Per-matrix results */}
      {individualResults.map(({ mat, det, trace, rank, inv, transpose }) => (
        <div key={mat.id} className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-sm space-y-4">
          <p className="text-[11px] font-black text-[#202124] uppercase tracking-wider border-b border-[#F1F3F4] pb-2">
            Matrix {mat.name} — {mat.rows}×{mat.cols} Results
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {det !== null && (
              <div className="bg-[#F8F9FA] rounded-lg p-3">
                <p className="text-[#5F6368] font-bold mb-1">Determinant |{mat.name}|</p>
                <p className="text-xl font-black text-[#202124]">{fmt(det)}</p>
                {Math.abs(det) < 1e-10 && <p className="text-[10px] text-amber-600 font-bold mt-1">⚠ Singular — no inverse exists</p>}
              </div>
            )}
            {trace !== null && (
              <div className="bg-[#F8F9FA] rounded-lg p-3">
                <p className="text-[#5F6368] font-bold mb-1">Trace tr({mat.name})</p>
                <p className="text-xl font-black text-[#202124]">{fmt(trace)}</p>
              </div>
            )}
            <div className="bg-[#F8F9FA] rounded-lg p-3">
              <p className="text-[#5F6368] font-bold mb-1">Rank</p>
              <p className="text-xl font-black text-[#202124]">{rank}</p>
            </div>
            <div className="bg-[#F8F9FA] rounded-lg p-3">
              <p className="text-[#5F6368] font-bold mb-1">Order</p>
              <p className="text-xl font-black text-[#202124]">{mat.rows}×{mat.cols}</p>
            </div>
          </div>

          <ResultMatrix label={`Transpose ${mat.name}ᵀ`} data={transpose} />
          {inv && <ResultMatrix label={`Inverse ${mat.name}⁻¹`} data={inv} />}
          {mat.rows === mat.cols && !inv && det !== null && Math.abs(det) < 1e-10 && (
            <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              Singular Matrix — Inverse does not exist (det = 0)
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <ModernCalcLayout
      slug="matrices"
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Engineering Mathematics', href: '/engineering/' },
        { label: 'Matrix Calculator' },
      ]}
      title="Matrix Calculator"
      description="Free-form matrix calculator supporting any dimensions (m×n). Build multi-matrix expressions using +, −, ×, ÷. Compute determinant, inverse, transpose, trace and rank for matrices A through H."
      icon={CalcIcon}
      relatedTools={[
        { label: 'Linear Equation Solver', href: '/calculator/linear-solver/' },
        { label: 'Quadratic Solver', href: '/calculator/quadratic-solver/' },
        { label: '3D Graph Calculator', href: '/engineering/3d/' },
        { label: 'Scientific Calculator', href: '/calculator/scientific-calculator/' },
      ]}
      inputs={inputPanel}
      results={resultsPanel}
      details={seoContent}
      sidebar={{
        title: 'Engineering Maths',
        subtitle: 'Related Tools',
        links: [
          { label: 'Linear Solver', href: '/calculator/linear-solver/', icon: CalcIcon },
          { label: 'Quadratic Solver', href: '/calculator/quadratic-solver/', icon: CalcIcon },
          { label: '3D Graph', href: '/engineering/3d/', icon: Layers },
        ],
      }}
      faqs={[]}
      seoContent={seoContent}
    />
  );
}
