import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("tailwind design tokens are available via class names", () => {
  const { container } = render(<div className="bg-vojvodina-red text-vojvodina-light">x</div>);
  const el = container.firstChild as HTMLElement;
  expect(el.className).toContain("bg-vojvodina-red");
  expect(el.className).toContain("text-vojvodina-light");
});
