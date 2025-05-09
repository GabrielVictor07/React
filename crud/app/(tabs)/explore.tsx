import { Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Explore() {
  const router = useRouter();

  return (
    <View>
      <Text>Explore Page</Text>
      <Button title="Go to Form" onPress={() => router.push('../AppForm')} />
    </View>
  );
}
