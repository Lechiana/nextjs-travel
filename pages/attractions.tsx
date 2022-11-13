import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  Breadcrumbs,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";

type Data = {
  id: string;
  name: string;
  coverimage: string;
  detail: string;
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/attractions");
  const data: Data[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Collection
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>

      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 10, pb: 3 }}>
          <Link color="inherit" href="/">
            Login
          </Link>
          <Link color="inherit" href="/attractions/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
        </Breadcrumbs>
      </div>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Grid container spacing={2}>
          {data.map((attractions) => (
            <Grid item xs={12} md={4} key={attractions.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={attractions.coverimage}
                  alt={attractions.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {attractions.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap={true}
                  >
                    {attractions.detail}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={"/attractions/" + attractions.id}>
                    <Button size="small">More</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <footer className={styles.footer}>
        <a target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export default Page;
