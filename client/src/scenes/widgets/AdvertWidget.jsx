import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/speedwayMotorsAd.jpeg
        "

        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Speedway Motors</Typography>
        <Typography color={medium}>speedwaymotors.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      Huge Inventory & Low Prices. Orders Over $149 Ship Free! Huge Inventory In Stock. Industry Leading Shipping. 70+ Yrs Racing & Rodding.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;