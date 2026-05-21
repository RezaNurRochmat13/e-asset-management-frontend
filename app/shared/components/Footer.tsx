import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container className="py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} eAsset Management. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 transition hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-500 transition hover:text-gray-900">
              Terms
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
