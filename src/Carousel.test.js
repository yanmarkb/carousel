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

test("left arrow moves to the previous image", () => {
	const photos = [
		{ src: "https://example.com/image1.jpg", caption: "Image 1" },
		{ src: "https://example.com/image2.jpg", caption: "Image 2" },
	];
	const title = "Test Carousel";
	const { getByLabelText, rerender, getByAltText } = render(
		<Carousel photos={photos} title={title} />
	);

	// Move to the second image
	fireEvent.click(getByLabelText("Go forward"));

	// Click the left arrow
	fireEvent.click(getByLabelText("Go back"));

	// Re-render the component to get the updated state
	rerender(<Carousel photos={photos} title={title} />);

	// Check that the first image is displayed
	expect(getByAltText("Image 1")).toBeInTheDocument();
});

test("left arrow is missing on the first image and right arrow is missing on the last image", () => {
	const photos = [
		{ src: "https://example.com/image1.jpg", caption: "Image 1" },
		{ src: "https://example.com/image2.jpg", caption: "Image 2" },
	];
	const title = "Test Carousel";
	const { getByLabelText, queryByLabelText, rerender } = render(
		<Carousel photos={photos} title={title} />
	);

	// Check that the left arrow is not in the document
	expect(queryByLabelText("Go back")).not.toBeInTheDocument();

	// Move to the second image
	fireEvent.click(getByLabelText("Go forward"));

	// Re-render the component to get the updated state
	rerender(<Carousel photos={photos} title={title} />);

	// Check that the right arrow is not in the document
	expect(queryByLabelText("Go forward")).not.toBeInTheDocument();
});
