// carousel/src/Card.test.js
import { render } from "@testing-library/react";
import Card from "./Card";

//Smoke test
test("renders Card without crashing", () => {
	render(<Card />);
});

//Snapshot test
test("matches snapshot", () => {
	const { asFragment } = render(<Card />);
	expect(asFragment()).toMatchSnapshot();
});
