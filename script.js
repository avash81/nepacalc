const fs = require('fs');
const file = 'src/app/nepal/bluebook-renewal-nepal/page.tsx';
let text = fs.readFileSync(file, 'utf8');

const targetStr = `<h3 className={h3}>2. Provincial EDL/VRS Portals</h3>
            <p className={prose}>
              Each province may provide its own online vehicle service through an <strong>EDL/VRS or similar portal</strong>.
            </p>
            <p className={\`\${prose} mt-3\`}>
              You can use the portal to check your vehicle details, tax dues and available online services.
            </p>
            <p className={\`\${prose} mt-3 font-semibold\`}>
              Basic steps:
            </p>`;

const replacementStr = `<h3 className={h3}>2. Provincial EDL/VRS Portals</h3>
            <p className={prose}>
              Each province may provide its own online vehicle service through an <strong>EDL/VRS or similar portal</strong>.
            </p>
            <p className={\`\${prose} mt-3\`}>
              You can use the portal to check your vehicle details, tax dues and available online services:
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {provinces.map(({ name, portal, portalLabel }) => (
                <a
                  key={name}
                  href={portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">{name}</p>
                    <p className="text-xs text-slate-500">{portalLabel}</p>
                  </div>
                  <span className="text-blue-400 group-hover:text-blue-600">→</span>
                </a>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 mb-6">
              <strong>Important:</strong> Online tax payment does <em>not</em> automatically mean the entire Bluebook-renewal process is complete. In some provinces, you still need to visit the Transport Management Office to get the physical stamp on your Bluebook. Sudurpashchim&apos;s VRS portal currently lists some services as &ldquo;Coming Soon.&rdquo; Always check the current status of your provincial portal before relying on a fully online renewal.
            </div>

            <p className={\`\${prose} mt-3 font-semibold\`}>
              Basic steps:
            </p>`;

if (text.includes(targetStr)) {
  text = text.replace(targetStr, replacementStr);
  fs.writeFileSync(file, text, 'utf8');
  console.log("Successfully restored provincial links grid.");
} else {
  console.log("Target string not found, check exactly how it's formatted.");
}
