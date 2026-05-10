/**
 * @fileoverview Firestore REST Utility — NEPACALC
 * Used for fetching content in React Server Components (RSCs) without
 * initializing the full Firebase Client SDK.
 */

export async function fetchFirestoreCollection(collectionName: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const dbId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || '(default)';
  
  if (!projectId) {
    console.error('Firestore REST Error: Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID');
    return [];
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${dbId}/documents/${collectionName}?pageSize=100`;

  try {
    const res = await fetch(url, { 
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(`Firestore REST Error (${collectionName}):`, err);
      return [];
    }

    const data = await res.json();
    if (!data.documents) return [];

    return data.documents.map((doc: any) => {
      const f = doc.fields;
      const parsed: any = { id: doc.name.split('/').pop() };
      
      // Basic type parsing for Firestore REST format
      for (const key in f) {
        if (f[key].stringValue !== undefined) parsed[key] = f[key].stringValue;
        else if (f[key].integerValue !== undefined) parsed[key] = parseInt(f[key].integerValue);
        else if (f[key].booleanValue !== undefined) parsed[key] = f[key].booleanValue;
        else if (f[key].timestampValue !== undefined) parsed[key] = f[key].timestampValue;
        else if (f[key].arrayValue !== undefined) {
          parsed[key] = f[key].arrayValue.values?.map((v: any) => v.stringValue || v) || [];
        }
      }
      return parsed;
    });
  } catch (error) {
    console.error(`Firestore REST Fetch Failure (${collectionName}):`, error);
    return [];
  }
}
export async function fetchDocumentBySlug(collectionName: string, slug: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const dbId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || '(default)';
  
  if (!projectId) return null;

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${dbId}/documents:runQuery`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: collectionName }],
          where: {
            fieldFilter: {
              field: { fieldPath: 'slug' },
              op: 'EQUAL',
              value: { stringValue: slug }
            }
          },
          limit: 1
        }
      })
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data[0] || !data[0].document) return null;

    const doc = data[0].document;
    const f = doc.fields;
    const parsed: any = { id: doc.name.split('/').pop() };
    
    for (const key in f) {
      if (f[key].stringValue !== undefined) parsed[key] = f[key].stringValue;
      else if (f[key].integerValue !== undefined) parsed[key] = parseInt(f[key].integerValue);
      else if (f[key].booleanValue !== undefined) parsed[key] = f[key].booleanValue;
      else if (f[key].timestampValue !== undefined) parsed[key] = f[key].timestampValue;
      else if (f[key].arrayValue !== undefined) {
        parsed[key] = f[key].arrayValue.values?.map((v: any) => v.stringValue || v) || [];
      }
    }
    return parsed;
  } catch (err) {
    console.error(`Firestore REST Query Error (${collectionName}):`, err);
    return null;
  }
}

