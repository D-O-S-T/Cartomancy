import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const decks = [
  { label: "Tarot de Rider-Waite", value: "rider" },
  { label: "Tarot de Marselha", value: "marselha" },
  { label: "Baralho Cigano", value: "cigano" },
];

const { width, height } = Dimensions.get("window");

export default function DeckPicker({ selectedDeck, onSelectDeck }) {
  const [modalVisible, setModalVisible] = useState(false);

  const isDisabled = (deckValue) => deckValue !== "rider";

  const selectDeck = (deck) => {
    if (isDisabled(deck.value)) return;
    onSelectDeck(deck.value);
    setModalVisible(false);
  };

  const selectedLabel = decks.find((d) => d.value === selectedDeck)?.label;

  return (
    <View
      style={{
        marginBottom: 30,
        width: "80%",
        maxWidth: 320,
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        style={styles.buttonPicker}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonPickerText}>
          {selectedLabel || "Selecione um baralho..."}
        </Text>
        <Feather name="chevron-down" size={20} color="#fff" />
      </TouchableOpacity>

      {isDisabled(selectedDeck) && (
        <Text style={styles.disabledMessage}>Deck currently unavailable</Text>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={decks}
              keyExtractor={(item) => item.value}
              style={styles.flatListContainer}
              renderItem={({ item }) => {
                const disabled = isDisabled(item.value);
                const isSelected = item.value === selectedDeck;
                return (
                  <TouchableOpacity
                    disabled={disabled}
                    style={[
                      styles.option,
                      isSelected && !disabled && styles.selectedOption,
                      disabled && styles.disabledOption,
                    ]}
                    onPress={() => selectDeck(item)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && !disabled && styles.selectedOptionText,
                        disabled && styles.disabledOptionText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity
              style={[styles.option, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.optionText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPicker: {
    backgroundColor: "rgba(142, 45, 226, 0.3)",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonPickerText: {
    color: "#fff",
    fontSize: 16,
  },
  disabledMessage: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    fontStyle: "italic",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#2c003e",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    maxWidth: 430,
    alignSelf: "center",
    maxHeight: "70%", // height limit for scrollable content
  },
    flatListContainer: {
    maxHeight: 300,
    },
    option: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
    },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: "#8E2DE2",
    borderRadius: 12,
  },
  selectedOptionText: {
    fontWeight: "bold",
  },
  disabledOption: {
    backgroundColor: "transparent",
  },
  disabledOptionText: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  cancelButton: {
    marginTop: 15,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
  },
});
