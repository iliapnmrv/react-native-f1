import {
  ActivityIndicator,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {
  useGetDriverRacesQuery,
  useGetOneDriverQuery,
} from 'store/api/driversApi';
import DriverInfoItem from 'components/DriverInfoItem';
import Pagination from 'components/Pagination';

type Props = NativeStackScreenProps<RootStackParamList, 'Driver', 'MyStack'>;

const Driver = ({route, navigation}: Props) => {
  const {driverId} = route.params;

  const [page, setPage] = useState(1);

  const {data: driver, error, isLoading} = useGetOneDriverQuery(driverId);
  const {
    data: races,
    error: racesError,
    isLoading: isLoadingRaces,
  } = useGetDriverRacesQuery({id: driverId, page});

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ScrollView style={{paddingHorizontal: 15, flex: 1}}>
      {driver?.url ? (
        <View>
          <Text>Узнать больше </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              Linking.openURL(driver!.url);
            }}>
            <Text style={{color: 'blue'}}>{driver?.url}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <DriverInfoItem
        name="Фамилия"
        value={driver!.familyName}
        isFirst={true}
      />
      <DriverInfoItem name="Имя" value={driver!.givenName} />
      <DriverInfoItem
        name="Дата рождения"
        value={driver?.dateOfBirth?.toLocaleString()}
      />
      <DriverInfoItem name="Национальность (ENG)" value={driver!.nationality} />
      <DriverInfoItem
        name="Код"
        value={driver?.code ? driver.code : 'Код гонщика отсутствует'}
        isLast={true}
      />
      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 20}}>Таблица заездов</Text>
        <Pagination
          page={page}
          pages={Math.ceil((races?.MRData.total || 0) / 30)}
          setPage={setPage}
        />
        {races?.MRData?.RaceTable?.Races?.map((race, index) => (
          <View key={index} style={styles.raceItem}>
            <Text style={styles.raceItemText}>
              {race.date} {race.raceName}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Driver;

const styles = StyleSheet.create({
  raceItem: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    borderLeftWidth: 1,
    borderLeftColor: 'lightgray',
    borderRightWidth: 1,
    borderRightColor: 'lightgray',
  },
  raceItemText: {
    padding: 10,
    fontSize: 15,
  },
});
