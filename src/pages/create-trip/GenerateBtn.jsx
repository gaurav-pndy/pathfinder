import { Button } from "@/components/ui/button";
import React from "react";

const GenerateBtn = React.forwardRef(
  ({ onGenerateTrip, loading, asChild }, ref) => {
    const Wrapper = asChild ? "span" : "button";

    return (
      <Button
        ref={ref} // Forward the ref to the wrapper
        disabled={loading}
        onClick={asChild ? undefined : onGenerateTrip}
        variant="customBtn"
      >
        {loading ? (
          "Generating..."
        ) : (
          <>
            <span className="transition-all duration-1000 md:group-hover:hidden">
              Generate Trip
            </span>
            <span className="group-hover:scale-[500%] transition-transform duration-500">
              ✈️
            </span>
          </>
        )}
      </Button>
    );
  }
);

// Add a display name for better debugging
GenerateBtn.displayName = "GenerateBtn";

export default GenerateBtn;
