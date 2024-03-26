import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function fetchData() {
    try {
      let response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={1}>
          {countries.map((country, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={country.flags.png}
                  alt={country.name.common}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {country.name.common}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default App;
