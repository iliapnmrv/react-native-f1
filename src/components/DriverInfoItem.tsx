import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  name: string;
  value?: string;
  isFirst?: boolean;
  isLast?: boolean;
};

const DriverInfoItem = ({
  name,
  value,
  isFirst = false,
  isLast = false,
}: Props) => {
  return value ? (
    <View
      style={[
        styles.infoItemContainer,
        isFirst
          ? {marginTop: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5}
          : null,
        isLast
          ? {
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              borderBottomWidth: 1,
              borderBottomColor: 'lightgray',
            }
          : null,
      ]}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  ) : null;
};

export default DriverInfoItem;

const styles = StyleSheet.create({
  infoItemContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    borderRightWidth: 1,
    borderRightColor: 'lightgray',
    borderLeftWidth: 1,
    borderLeftColor: 'lightgray',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  valueText: {
    fontSize: 18,
  },
});
