import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function () {
	const { container } = render(
		<Carousel photos={TEST_IMAGES} title="images for testing" />
	);
	// expect the first image to show, but not the second
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = container.querySelector(".bi-arrow-right-circle");
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).not.toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).toBeInTheDocument();
});

//Smoke test
test("renders Carousel without crashing", () => {
	const photos = [
		{ src: "https://example.com/image1.jpg", caption: "Image 1" },
		{ src: "https://example.com/image2.jpg", caption: "Image 2" },
	];
	const title = "Test Carousel";
	render(<Carousel photos={photos} title={title} />);
});

//Snapshot test
test("matches snapshot", () => {
	const photos = [
		{ src: "https://example.com/image1.jpg", caption: "Image 1" },
		{ src: "https://example.com/image2.jpg", caption: "Image 2" },
	];
	const title = "Test Carousel";
	const { asFragment } = render(<Carousel photos={photos} title={title} />);
	expect(asFragment()).toMatchSnapshot();
});
