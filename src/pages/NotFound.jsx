import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="big">404</p>
      <h1>Page not found</h1>
      <p className="due">The page you're looking for doesn't exist or was moved.</p>
      <Link to="/" className="btn btn-primary">Go to Dashboard</Link>
    </section>
  );
}