import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, Alert, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountScreen() {
  const colorScheme = useColorScheme() || 'light';
  const styles = createStyles(colorScheme);
  
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  
  // En una app real, cargaríamos los datos del usuario desde una API o AsyncStorage
  
  const handleGuardarPerfil = async () => {
    if (!nombre || !telefono || !email) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    
    try {
      // Guardar en AsyncStorage
      const userData = { nombre, telefono, email, direccion };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      Alert.alert('Perfil Actualizado', 'Tus datos han sido guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar perfil:', error);
      Alert.alert('Error', 'No se pudieron guardar tus datos. Intenta nuevamente.');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Cuenta</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <FontAwesome name="user" size={60} color={Colors[colorScheme].mediumGray} />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <FontAwesome name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.profileName}>{nombre || 'Usuario'}</Text>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          <TextInput 
            style={styles.input}
            placeholder="Nombre completo *"
            value={nombre}
            onChangeText={setNombre}
            placeholderTextColor={Colors[colorScheme].darkGray}
          />
          
          <TextInput 
            style={styles.input}
            placeholder="Teléfono *"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            placeholderTextColor={Colors[colorScheme].darkGray}
          />
          
          <TextInput 
            style={styles.input}
            placeholder="Email *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor={Colors[colorScheme].darkGray}
          />
          
          <TextInput 
            style={styles.input}
            placeholder="Dirección de entrega"
            value={direccion}
            onChangeText={setDireccion}
            placeholderTextColor={Colors[colorScheme].darkGray}
          />
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleGuardarPerfil}
          >
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem}>
            <FontAwesome name="credit-card" size={20} color={Colors[colorScheme].text} />
            <Text style={styles.optionText}>Métodos de Pago</Text>
            <FontAwesome name="chevron-right" size={14} color={Colors[colorScheme].darkGray} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <FontAwesome name="bell" size={20} color={Colors[colorScheme].text} />
            <Text style={styles.optionText}>Notificaciones</Text>
            <FontAwesome name="chevron-right" size={14} color={Colors[colorScheme].darkGray} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <FontAwesome name="question-circle" size={20} color={Colors[colorScheme].text} />
            <Text style={styles.optionText}>Ayuda y Soporte</Text>
            <FontAwesome name="chevron-right" size={14} color={Colors[colorScheme].darkGray} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <FontAwesome name="sign-out" size={18} color={Colors[colorScheme].danger} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[colorScheme].background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors[colorScheme].mediumGray,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors[colorScheme].text,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors[colorScheme].mediumGray,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors[colorScheme].lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors[colorScheme].primary,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors[colorScheme].background,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors[colorScheme].text,
  },
  formSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors[colorScheme].mediumGray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors[colorScheme].text,
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors[colorScheme].lightGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: Colors[colorScheme].text,
  },
  saveButton: {
    backgroundColor: Colors[colorScheme].primary,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors[colorScheme].mediumGray,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors[colorScheme].lightGray,
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: Colors[colorScheme].text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 20,
    marginBottom: 30,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors[colorScheme].danger,
    fontWeight: '600',
  },
}); 