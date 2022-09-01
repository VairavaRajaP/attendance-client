import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component-2";

export default function Tabler({ initial }) {
  alertIndex = (index) => {
    Alert.alert(`This is row ${index + 1}`);
  };
  console.log(initial);
  const element = (data, index) => (
    <TouchableOpacity onPress={() => alertIndex(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderColor: "transparent" }}>
        {/* <Row
          data={initial.tableHead}
          style={styles.head}
          textStyle={styles.text}
        /> */}

        {/* <TableWrapper style={styles.row}> */}
        {initial
          ? (initial) => (
              <Cell key={initial.id} data={initial} textStyle={styles.text} />
            )
          : null}
        {/* ))} */}
        {/* </TableWrapper> */}

        {/* // initial.map((rowData, index) => (
            //     <TableWrapper key={index} style={styles.row}>
            //       {rowData.map((cellData, cellIndex) => (
            //         <Cell 
            //           key={cellIndex}
            //           data={cellIndex === 3 ? element(cellData, index) : cellData}
            //           textStyle={styles.text}
            //         />
            //       ))}
            //     </TableWrapper>
            //   ))
            // null} */}
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#808B97" },
  text: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
});
