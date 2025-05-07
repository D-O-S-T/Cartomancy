import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useFetchData } from '../../hooks/useFetchData';

export default function IndexScreen() {
  const { data, loading } = useFetchData();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#000' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.name_short}
          renderItem={({ item }) => (
            <View style={{
              marginBottom: 16,
              padding: 12,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#ccc',
              backgroundColor: '#111'
            }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4, color: '#fff' }}>
                🔮 {item.name}
              </Text>
              <Text style={{ marginBottom: 4, color: '#ddd' }}>
                {item.meaning_up}
              </Text>
              <Text style={{ fontStyle: 'italic', color: '#90caf9' }}>
                🌀 Invertido: {item.meaning_rev}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
