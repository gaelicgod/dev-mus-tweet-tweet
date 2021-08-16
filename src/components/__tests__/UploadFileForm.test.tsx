import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import UploadFileForm from "../UploadFileForm";



describe("UploadFileForm Component", () => {
    test("it renders a file upload text",() => {
        render(<UploadFileForm updateDisplay={() => { return '' }} />);
        const exampleText = screen.getByText(/Users file upload/);
        expect(exampleText).toBeInTheDocument();
    });

    test("it renders a file upload label",() => {
        render(<UploadFileForm updateDisplay={() => { return '' }} />);
        const exampleText = screen.getByLabelText(/Tweets file upload/);
        expect(exampleText).toBeInTheDocument();
    });

    test("testing error message shows on submit button click",() => {
        render(<UploadFileForm updateDisplay={() => { return '' }} />);
        fireEvent.click(screen.getByText("Process Files"));
        // check if the <p> tag error message has appeared.
        const responseText = screen.getByText(/Error sending file data!/);
        expect(responseText).toBeInTheDocument();
    });
});