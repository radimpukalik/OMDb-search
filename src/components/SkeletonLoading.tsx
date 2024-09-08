import { Skeleton, Card, CardContent, Box } from "@mui/material";

export default function SkeletonLoading() {
  return (
    <Card
      sx={{
        width: 220,
        backgroundColor: "#424242",
        borderRadius: 2,
        overflow: "hidden", // Ensures smooth edges and no overflow
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", // Light shadow for better aesthetics
      }}
    >
      <Box sx={{ position: "relative", width: 220, height: 350 }}>
        {/* Main Image Skeleton */}
        <Skeleton
          variant="rectangular"
          width={220}
          height={350}
          sx={{ backgroundColor: "#424242" }}
        />

        {/* Middle Rectangle Skeleton (overlayed) */}
        <Skeleton
          variant="rectangular"
          width={180}
          height={300}
          sx={{
            backgroundColor: "#a6a6a6",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px", // Slightly rounded corners
            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.2)", // Adds some depth to the rectangle
          }}
        />
      </Box>

      <CardContent sx={{ padding: 2, backgroundColor: "#333" }}>
        {/* Title Skeleton */}
        <Skeleton
          variant="text"
          width="80%"
          height={30}
          sx={{ backgroundColor: "#bdbdbd", marginBottom: 1 }}
        />

        {/* Subtitle Skeleton */}
        <Skeleton
          variant="text"
          width="60%"
          height={20}
          sx={{ backgroundColor: "#bdbdbd" }}
        />
      </CardContent>
    </Card>
  );
}
