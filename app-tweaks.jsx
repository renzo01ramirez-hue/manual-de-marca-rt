/* Renzo Ramírez — Tweaks panel */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#F03E2E",
  "grain": 0.07,
  "displayScale": 1,
  "labels": true
}/*EDITMODE-END*/;

function RenzoTweaks(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(()=>{
    const root = document.documentElement;
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--grain', String(t.grain));
    root.style.setProperty('--display-scale', String(t.displayScale));
    document.body.classList.toggle('no-labels', !t.labels);
  }, [t.accent, t.grain, t.displayScale, t.labels]);

  return (
    <TweaksPanel>
      <TweakSection label="Acento" />
      <TweakColor label="Color de destaque" value={t.accent}
        options={['#F03E2E','#FF5A2C','#D7263D','#111111']}
        onChange={(v)=>setTweak('accent', v)} />
      <TweakSection label="Textura" />
      <TweakSlider label="Intensidad del grano" value={t.grain} min={0} max={0.18} step={0.01}
        onChange={(v)=>setTweak('grain', v)} />
      <TweakSection label="Tipografía" />
      <TweakSlider label="Escala display" value={t.displayScale} min={0.8} max={1.15} step={0.01} unit="×"
        onChange={(v)=>setTweak('displayScale', v)} />
      <TweakToggle label="Labels de sistema" value={t.labels}
        onChange={(v)=>setTweak('labels', v)} />
    </TweaksPanel>
  );
}

(function mount(){
  const el = document.getElementById('tweaks-root');
  if(window.ReactDOM && window.useTweaks){ ReactDOM.createRoot(el).render(<RenzoTweaks/>); }
  else { setTimeout(mount, 80); }
})();
