import React, { createRef, useRef, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputTextInputEventData, TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GlobalStyles } from "../styles/colors";
import { GooglePlaceSuggestList, useLazyGetSuggestPlaceQuery } from "../query/GooglePlace";
import { useLazyGetSuggestQuery } from "../query/LocationIQ";
import { LocationCoordinate } from "../types/LocationItem";
import { useSelector } from "react-redux";
import { selectLoginState } from "../redux/LoginState";


export type SearchTxtInputProps = {
  iconName: string,
  color: string,
  textValue?: string,
  service: "Google" | "LocationIQ"
  onSuggestionFound?: (suggest: LocationCoordinate[]) => void,
  onTextInputFocus?: () => void,
  onTextInputBlur?: () => void
}

function SearchTxtInput(props: SearchTxtInputProps): JSX.Element {
  const { textValue, iconName, color, onSuggestionFound, onTextInputFocus } = props;

  const loginState = useSelector(selectLoginState);

  const [queryTrigger, suggestions] = useLazyGetSuggestPlaceQuery();
  const [queryTriggerIQ, suggestionsIQ] = useLazyGetSuggestQuery();

  const [isEditing, setIsEditing] = useState<boolean>(textValue ? false : true)
  const lastFetchTime = useRef<number>(0);
  const [queryText, setQueryText] = useState<string>(props.textValue || "");

  async function querySuggestion(text: string) {
    console.log("Search text", text);

    if (props.service === "LocationIQ") {
      const result = await queryTriggerIQ({
        apiKey: loginState?.user?.locationIQKey || "pk.6290201b4314f0a31f29a0867aa0bf85",
        search: text
      });
      if (result.data && onSuggestionFound) {
        const sug: LocationCoordinate[] = result.data.map(s => ({
          name: s.display_name,
          id: s.place_id,
          lat: parseFloat(s.lat),
          lon: parseFloat(s.lon)
        }));
        onSuggestionFound(sug);
      }

    } else {
      const result = await queryTrigger({ input: text, lat: 10.788350595150893, lon: 106.69378372372894, radius: 5000 });
      if (result.data && onSuggestionFound) {
        const sug: LocationCoordinate[] = result.data.predictions.map((s) => ({
          name: s.description,
          id: s.place_id
        }));
        onSuggestionFound(sug);
      }
    }


  }

  function onTextChangeText(text: string) {
    setQueryText(text);
  }

  function onTextFoucus() {
    if (onTextInputFocus) {
      onTextInputFocus();
    }
  }

  function onTextBlur() {
    if (isEditing) {
      setIsEditing(false);
    }
  }

  function onSearchSubmit() {
    querySuggestion(queryText);
  }

  return (<View style={[GlobalStyles.propShadow, styles.textInputWrapper]}>
    <View style={styles.iconWrapper}>
      <Icon name={iconName} size={24} color={color} />
    </View>
    <TextInput
      value={queryText}
      onFocus={onTextFoucus}
      onBlur={onTextBlur}
      onChangeText={onTextChangeText}
      onSubmitEditing={onSearchSubmit}
      style={styles.textInputStyle} />
  </View>)
};

const styles = StyleSheet.create({
  textInputWrapper: {
    width: "74%",
    paddingHorizontal: 5,
    margin: 4,
    borderRadius: 10,
    flexDirection: "row",
    elevation: 20,
  },
  textInputStyle: {
    backgroundColor: GlobalStyles.mainWhite.color,
    padding: 2,
    flex: 1,
    fontSize: 16,
    minHeight: 36,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.mainWhite.color,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    aspectRatio: 1
  }
});

export default SearchTxtInput;