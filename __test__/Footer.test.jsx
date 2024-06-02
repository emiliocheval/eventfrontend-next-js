import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/app/_components/footer";

describe("Footer", () => {
    it("should render the Contact Us text", () => {
        render(
              <Footer/>
          );
      const divElement = screen.getByText("Contact Us"); 
      expect(divElement).toBeInTheDocument(); 
    });

    it("should render the About text", () => {
      render(
            <Footer/>
        );
    const divElement = screen.getByText("About"); 
    expect(divElement).toBeInTheDocument(); 
  });
    
  });