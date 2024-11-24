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
        className="generate-btn group md:w-[200px] md:h-[60px] md:text-lg font-semibold rounded-lg flex items-center justify-center transition-all duration-300 
                    bg-gradient-to-r from-black to-purple-800 text-white hover:shadow-md hover:bg-gradient-to-l active:scale-95"
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
