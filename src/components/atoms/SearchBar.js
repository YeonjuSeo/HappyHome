import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import SearchIcon from "../../assets/search.png";

export function SearchButton({ navigation, keyword }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Result", { keyword: keyword });
      }}
    >
      <Image source={SearchIcon} style={{ width: 26, height: 26 }} />
    </TouchableOpacity>
  );
}

export default function HomeSearchBar({ wishAddr, navigation }) {
  return (
    <SearchBar
      placeholder={`${wishAddr}의 어떤 집을 찾고 계세요?`}
      containerStyle={{
        backgroundColor: "white",
        marginTop: 18,
        marginBottom: 20,
        // height: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        border: "none",
      }}
      inputContainerStyle={{ backgroundColor: "white" }}
      searchIcon={<SearchButton navigation={navigation} />}
    />
  );
}

// const SearchBar = styled.TextInput`
//   background-color: white;
//   border: 1px solid #ededed;
//   height: 50px;
//   box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
//   margin: 18px 0 20px 0;
//   padding: 0 9px;
// `;
