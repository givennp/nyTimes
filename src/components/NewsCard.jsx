import { Box, CardMedia, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";

const NewsCard = ({ date, title, image, article, newsDetail, isLoading }) => {
  const router = useRouter();
  let [over, setOver] = useState(false);

  return (
    <Box
      onMouseEnter={() => setOver(!over)}
      onMouseLeave={() => setOver(!over)}
      onClick={()=> router.push(newsDetail)}
      sx={{
        boxShadow: "0px 14px 25px -10px rgba(0,0,0,0.75)",
        borderRadius: "16px",
        m: "20px",
        width: "250px",
        ":hover": {
          cursor: "pointer",
        },
      }}
    >
      <Typography
        sx={{
          p: "5px 10px",
          fontSize: "12px",
          fontWeight: "400",
          textAlign: "right",
        }}
      >
        {moment(date).format("DD MMM YY")}
      </Typography>
      <Box
        component="img"
        src={isLoading? <Skeleton/> : image}
        sx={{
          transition: "200ms",
          width: "inherit",
          height: "200px",
          objectFit: "cover",
          filter: !over ? "none" : "brightness(40%)",
        }}
      />
      <Box sx={{ p: "5px 10px", textAlign: "left" }}>
        <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: "14px", my: "10px" }}>
          {article.length > 100 ? `${article?.slice(0, 100)}...` : article}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewsCard;
