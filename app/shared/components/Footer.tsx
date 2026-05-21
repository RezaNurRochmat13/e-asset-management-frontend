import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <Container className="py-6">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} eAsset Management.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-gray-400 transition hover:text-gray-900">Privacy</a>
            <a href="#" className="text-xs text-gray-400 transition hover:text-gray-900">Terms</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
