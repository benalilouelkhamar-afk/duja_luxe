"use client";

import { settings } from "@/data/settings";
import { useLang } from "@/lib/i18n";
import { Modal } from "./Modal";

export function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, tr, lang } = useLang();
  const g = settings.sizeGuide;
  return (
    <Modal open={open} onClose={onClose} title={t("size_guide")}>
      <div className="overflow-x-auto rounded-2xl ring-1 ring-plum/15">
        <table className="w-full text-center text-sm">
          <thead className="bg-plum text-white">
            <tr>
              {g.headers[lang].map((h, i) => (
                <th key={i} scope="col" className="px-2 py-2.5 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {g.rows.map((r) => (
              <tr key={r[0]} className="odd:bg-white even:bg-lilac">
                {r.map((c, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="px-2 py-2.5 font-bold text-plum-800">
                      {c}
                    </th>
                  ) : (
                    <td key={i} className="px-2 py-2.5 tabular-nums text-ink">
                      {c}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-soft">cm</p>
      <p className="mt-3 text-sm leading-relaxed text-ink">{tr(g.note)}</p>
    </Modal>
  );
}
