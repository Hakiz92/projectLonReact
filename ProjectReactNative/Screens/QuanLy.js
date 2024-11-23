import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuanLy = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Trạng thái loading

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Bắt đầu trạng thái loading
      try {
        // Gửi yêu cầu GET đến API
        const response = await axios.get('http://localhost:4000/api/users');
        console.log("Response data:", response.data); // In ra dữ liệu nhận được từ API
        setUsers(response.data.users); // Cập nhật lại danh sách người dùng
      } catch (error) {
        console.error('Error fetching users:', error);
        alert("Có lỗi xảy ra trong quá trình lấy người dùng.");
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchUsers();
  }, []); // Chỉ chạy 1 lần khi component load

  const handleDelete = async (userId) => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      await axios.delete(`http://localhost:4000/api/users/${userId}`);
      // Lọc lại danh sách người dùng sau khi xóa
      setUsers(users.filter(user => user.id !== userId));
      alert("Người dùng đã được xóa thành công!"); // Thông báo thành công
    } catch (error) {
      console.error('Error deleting user:', error);
      alert("Có lỗi xảy ra trong quá trình xóa người dùng."); // Thông báo lỗi
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  const confirmDelete = (userId) => {
    // Sử dụng alert để xác nhận
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      handleDelete(userId);
    }
  };

  return (
    <View style={styles.container}>
      {/* Biểu tượng mũi tên */}
      <View style={{ marginBottom: 20 }}>
        <Icon
          name='arrow-left'
          size={24}
          color="#000"
          onPress={() => { navigation.navigate("DangKy") }}
        />
      </View>
      <Text style={styles.title}>Quản lý thông tin</Text>
      {/* Hiển thị danh sách người dùng */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text>{item.username}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('CapNhatUser', { userId: item.id })}>
                <Text style={styles.updateButton}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  updateButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default QuanLy;
