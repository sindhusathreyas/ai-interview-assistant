import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function CandidateListTable() {
  const candidates = useSelector((s: RootState) => s.candidates.allIds.map(id => s.candidates.byId[id]));
  return (
    <table>
      <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Score</th></tr></thead>
      <tbody>
        {candidates.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.status}</td>
            <td>{c.finalScore ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
