import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";

// get data from this URL!
const movieURL = "https://reactnative.dev/movies.json";

const App = () => {
  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(movieURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json.movies);
        setTitle(json.title);
        setDescription(json.description);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  }, []);

  // Also get call asynchronous function
  async function getMoviesAsync() {
    try {
      let response = await fetch(movieURL);
      let json = await response.json();
      setData(json.movies);
      setTitle(json.title);
      setDescription(json.description);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* While fetching show the indicator, else show response*/}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/* Title from URL */}
          <Text style={styles.title}>{title}</Text>
          {/* Display each movie */}
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.movieText}>
                  {item.id}. {item.title}, {item.releaseYear}
                </Text>
              </View>
            )}
          />
          {/* Show the description */}
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  movieText: {
    fontSize: 26,
    fontWeight: "200",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "200",
    color: "green",
  },
});

export default App;
