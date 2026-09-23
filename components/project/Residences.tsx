'use client';

import { useState } from 'react';
import type { Project } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { useUI } from '@/components/providers/UIProvider';
import { FloorPlan } from './FloorPlan';

export function Residences({ project }: { project: Project }) {
  const [plan, setPlan] = useState<string | null>(null);
  const { openEnquiry } = useUI();

  return (
    <section id="residences" className="residences section" aria-labelledby="residences-title">
      <div className="container">
        <div className="residences__head">
          <p className="eyebrow reveal">Residences</p>
          <h2 id="residences-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            Choose Your <em>Space</em>
          </h2>
        </div>
        <div className="residences__grid">
          {project.residences.map((r, i) => (
            <article key={r.type} className="unit reveal" style={{ '--d': `${i * 100}ms` } as React.CSSProperties}>
              <h3 className="unit__type">{r.type}</h3>
              <dl className="unit__meta">
                <div>
                  <dt>Carpet / Built-up Area</dt>
                  <dd>{r.area}</dd>
                </div>
                <div>
                  <dt>Starting Price</dt>
                  <dd>{r.price}</dd>
                </div>
              </dl>
              <div className="unit__actions">
                <button type="button" className="btn btn--outline" onClick={() => setPlan(r.type)}>
                  <span>Floor Plan</span>
                  <Icon name="plan" />
                </button>
                <button
                  type="button"
                  className="link-arrow"
                  onClick={() => openEnquiry({ project: project.name, title: `Enquire — ${r.type}` })}
                >
                  Enquire <Icon name="arrow" />
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="placeholder-note">Areas and prices are placeholders. Final details as per approved plans.</p>
      </div>

      <Modal open={plan !== null} onClose={() => setPlan(null)} label={`${plan ?? ''} floor plan`} className="modal--plan">
        <p className="eyebrow">{project.name}</p>
        <h3 className="modal__title">{plan} — Floor Plan</h3>
        <FloorPlan label={plan ?? ''} />
        <p className="modal__note">Illustrative layout only. Detailed floor plans are shared on request.</p>
        <button
          type="button"
          className="btn btn--dark"
          onClick={() => {
            setPlan(null);
            openEnquiry({ project: project.name, title: `Request ${plan} Floor Plan` });
          }}
        >
          <span>Request Detailed Plan</span>
          <Icon name="arrow" />
        </button>
      </Modal>
    </section>
  );
}
