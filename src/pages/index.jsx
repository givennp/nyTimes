import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NewsCard from "../components/NewsCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [period, setPeriod] = useState(1);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        `https://api.nytimes.com/svc/mostpopular/v2/emailed/${period}.json?api-key=LVUjLttZeA60bq1xddnxVtmHOOLAoFYo`
      );

      const parsedRes = await res.json();
      setNews(parsedRes.results);
      setIsLoading(false);
    } catch (err) {
      return console.log(err);
    }
  };

  const renderNews = (page) => {
    if (page <= limit)
      return news?.map((val, page) => {
        if (page <= limit) {
          return (
            <NewsCard
              article={val.abstract}
              title={val.title}
              image={
                val.media[0]
                  ? val.media[0]["media-metadata"][0].url
                  : "https://dummyimage.com/600x400/000000/ffffff&text=this+news+doesn't+have+photo"
              }
              date={val.published_date}
              newsDetail={val.url}
              isLoading={isLoading}
              key={page}
            />
          );
        }
      });
  };

  useEffect(() => {
    fetchNews();
  }, [period]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <em>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mt: "60px", fontWeight: "600", fontFamily: "serif" }}
        >
          NYT ARTICLES
        </Typography>
      </em>

      <FormControl fullWidth sx={{ my: "30px" }}>
        <InputLabel id="period">Period</InputLabel>
        <Select
          labelId="period"
          value={period}
          label="Period"
          onChange={(e) => setPeriod(e.target.value)}
          size="small"
          sx={{ width: "300px" }}
        >
          <MenuItem value={1}>1 day</MenuItem>
          <MenuItem value={7}>7 days</MenuItem>
          <MenuItem value={30}>30 days</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {renderNews(page)}
      </Box>
      <Button
        sx={{ height: "50px", my: "20px" }}
        variant="contained"
        disabled={limit >= news.length ? true : false}
        onClick={() => {
          setLimit(limit + 6);
          setPage(Number(page) + 4);
        }}
      >
        Load more...
      </Button>
    </Container>
  );
}
