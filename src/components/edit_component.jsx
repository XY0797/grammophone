export default function EditComponent({ spec, specChanged }) {
  return (
    <div id="edit">
      <div className="spec-wrap">
        <textarea className="spec" onChange={(e) => { specChanged(e.target.value); }} value={spec} placeholder="在这里输入文法..." />
      </div>
    </div>
  );
}
