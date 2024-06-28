import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, Button, Alert, Image, ScrollView} from 'react-native';
import {Table, Row, Rows, TableWrapper} from 'react-native-table-component';
import {read, utils, WorkSheet} from 'xlsx';

const make_width = (ws: WorkSheet): number[] => {
  const aoa = utils.sheet_to_json(ws, {header: 1}),
    res: number[] = [];
  aoa.forEach(r => {
    r.forEach((c, C) => {
      res[C] = Math.max(res[C] || 60, String(c).length * 10);
    });
  });
  for (let C = 0; C < res.length; ++C) if (!res[C]) res[C] = 60;
  return res;
};

function App(): JSX.Element {
  const [data, setData] = useState<any[]>([
    'SheetJSSheetJS'.split(''),
    [5, 4, 3, 3, 7, 9, 5, 5, 4, 3, 3, 7, 9, 5],
    [8, 6, 7, 5, 3, 0, 9, 5, 4, 3, 3, 7, 9, 5],
    [8, 6, 7, 5, 3, 0, 9, 5, 4, 3, 3, 7, 9, 5],
    [8, 6, 7, 5, 3, 0, 9, 5, 4, 3, 3, 7, 9, 5],
    [8, 6, 7, 5, 3, 0, 9, 5, 4, 3, 3, 7, 9, 5],
    [5, 4, 3, 3, 7, 9, 5, 5, 4, 3, 3, 7, 9, 5],
    [8, 6, 7, 5, 3, 0, 9, 5, 4, 3, 3, 7, 9, 5],
    [8, 6, 7, 5, 3, 0, 9, 5, 4, 3, 3, 7, 9, 5],
    [8, 6, 7, 5, 3, 0, 9, 5, 4, 3, 3, 7, 9, 5],
  ]);
  const [widths, setWidths] = useState<number[]>(
    Array.from({length: 14}, () => 20),
  );

  const importFile = useCallback(async () => {
    try {
      const ab = await (
        await fetch('https://docs.sheetjs.com/pres.numbers')
      ).arrayBuffer();
      const wb = read(ab);

      /* convert first worksheet to AOA */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws, {header: 1});
      /* update state */
      setData(data);
      setWidths(make_width(ws));
    } catch (err) {
      Alert.alert('importFile Error', 'Error ' + ((err as any).message || err));
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}> </Text>
      <Text style={styles.welcome}>SheetJS × React Native</Text>
      <Button
        onPress={importFile}
        title="Import data from a spreadsheet"
        color="#841584"
      />
      <Text style={styles.bolded}>Current Data</Text>
      <ScrollView style={styles.table} horizontal={true}>
        <Table style={styles.table}>
          <TableWrapper>
            <Row
              data={data[0]}
              style={styles.thead}
              textStyle={styles.text}
              widthArr={widths}
            />
          </TableWrapper>
          <ScrollView>
            <TableWrapper>
              <Rows
                data={data.slice(1)}
                style={styles.tr}
                textStyle={styles.text}
                widthArr={widths}
              />
            </TableWrapper>
          </ScrollView>
        </Table>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {fontSize: 20, textAlign: 'center', margin: 10},
  bolded: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  thead: {height: 40, backgroundColor: '#f1f8ff'},
  tr: {height: 30},
  text: {marginLeft: 5},
  table: {width: '100%'},
  image: {height: 16, width: 16},
});

export default App;
