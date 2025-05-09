import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView, Alert, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCart } from '@/context/CartContext';
import { PedidosService } from '@/services/ApiService';
import { PedidoTipo } from '@/types';

export default function CartScreen() {
  const colorScheme = useColorScheme() || 'light';
  const styles = createStyles(colorScheme);
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const router = useRouter();
  
  const [pedidoTipo, setPedidoTipo] = useState<PedidoTipo>('delivery');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [pisoDepto, setPisoDepto] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [notas, setNotas] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleCompletarPedido = async () => {
    if (cart.length === 0) {
      Alert.alert('Error', 'No hay productos en el carrito');
      return;
    }
    
    if (!nombre || !telefono || !email) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    
    if (pedidoTipo === 'delivery' && !direccion) {
      Alert.alert('Error', 'Por favor ingresa una dirección de entrega');
      return;
    }
    
    if (pedidoTipo === 'pickup' && !sucursal) {
      Alert.alert('Error', 'Por favor selecciona una sucursal');
      return;
    }
    
    try {
      setLoading(true);
      
      const pedido = {
        nombre,
        telefono,
        email,
        direccion: pedidoTipo === 'delivery' ? direccion : '',
        pisoDepto: pedidoTipo === 'delivery' ? pisoDepto : '',
        sucursal: pedidoTipo === 'pickup' ? sucursal : '',
        tipo: pedidoTipo,
        notas,
        metodoPago,
        empanadas: cart.map(item => ({
          empanadaId: item.id,
          cantidad: item.cantidad,
          precio: item.precio
        }))
      };
      
      const response = await PedidosService.create(pedido);
      
      // Limpiar el carrito después de enviar el pedido
      clearCart();
      
      // Mostrar mensaje de éxito
      Alert.alert(
        'Pedido Enviado',
        `Tu pedido #${response.id} ha sido recibido y está siendo procesado.`,
        [
          { 
            text: 'Ver Mis Pedidos', 
            onPress: () => router.push('/orders')
          },
          {
            text: 'OK',
            style: 'cancel'
          }
        ]
      );
      
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      Alert.alert('Error', 'No se pudo enviar el pedido. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Carrito</Text>
      </View>
      
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome name="shopping-basket" size={60} color={Colors[colorScheme].darkGray} />
          <Text style={styles.emptyText}>Tu carrito está vacío</Text>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => router.push('/empanadas')}
          >
            <Text style={styles.continueButtonText}>Ver Menú</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.gusto}</Text>
                  <Text style={styles.itemPrice}>${item.precio} x {item.cantidad}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.cantidad - 1)}
                  >
                    <FontAwesome name="minus" size={14} color={Colors[colorScheme].text} />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.cantidad}</Text>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.cantidad + 1)}
                  >
                    <FontAwesome name="plus" size={14} color={Colors[colorScheme].text} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <FontAwesome name="trash" size={20} color={Colors[colorScheme].danger} />
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
              </View>
            }
          />
          
          <View style={styles.formContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Información de entrega</Text>
            </View>
            
            <View style={styles.buttonGroup}>
              <TouchableOpacity 
                style={[
                  styles.typeButton,
                  pedidoTipo === 'delivery' && styles.typeButtonActive
                ]}
                onPress={() => setPedidoTipo('delivery')}
              >
                <Text style={[
                  styles.typeButtonText,
                  pedidoTipo === 'delivery' && styles.typeButtonTextActive
                ]}>Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.typeButton,
                  pedidoTipo === 'pickup' && styles.typeButtonActive
                ]}
                onPress={() => setPedidoTipo('pickup')}
              >
                <Text style={[
                  styles.typeButtonText,
                  pedidoTipo === 'pickup' && styles.typeButtonTextActive
                ]}>Pickup</Text>
              </TouchableOpacity>
            </View>
            
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
            
            {pedidoTipo === 'delivery' ? (
              <>
                <TextInput 
                  style={styles.input}
                  placeholder="Dirección de entrega *"
                  value={direccion}
                  onChangeText={setDireccion}
                  placeholderTextColor={Colors[colorScheme].darkGray}
                />
                
                <TextInput 
                  style={styles.input}
                  placeholder="Piso / Departamento (Opcional)"
                  value={pisoDepto}
                  onChangeText={setPisoDepto}
                  placeholderTextColor={Colors[colorScheme].darkGray}
                />
              </>
            ) : (
              <TextInput 
                style={styles.input}
                placeholder="Sucursal para retirar *"
                value={sucursal}
                onChangeText={setSucursal}
                placeholderTextColor={Colors[colorScheme].darkGray}
              />
            )}
            
            <TextInput 
              style={styles.input}
              placeholder="Notas adicionales (Opcional)"
              value={notas}
              onChangeText={setNotas}
              placeholderTextColor={Colors[colorScheme].darkGray}
              multiline
            />
            
            <View style={styles.paymentContainer}>
              <Text style={styles.paymentLabel}>Método de pago:</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity 
                  style={[
                    styles.paymentButton,
                    metodoPago === 'efectivo' && styles.paymentButtonActive
                  ]}
                  onPress={() => setMetodoPago('efectivo')}
                >
                  <Text style={[
                    styles.paymentButtonText,
                    metodoPago === 'efectivo' && styles.paymentButtonTextActive
                  ]}>Efectivo</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.paymentButton,
                    metodoPago === 'tarjeta' && styles.paymentButtonActive
                  ]}
                  onPress={() => setMetodoPago('tarjeta')}
                >
                  <Text style={[
                    styles.paymentButtonText,
                    metodoPago === 'tarjeta' && styles.paymentButtonTextActive
                  ]}>Tarjeta</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleCompletarPedido}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.checkoutButtonText}>Completar Pedido</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: Colors[colorScheme].darkGray,
    marginTop: 20,
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: Colors[colorScheme].primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors[colorScheme].mediumGray,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors[colorScheme].text,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors[colorScheme].darkGray,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors[colorScheme].lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '500',
    color: Colors[colorScheme].text,
  },
  removeButton: {
    padding: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors[colorScheme].mediumGray,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors[colorScheme].text,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors[colorScheme].primary,
  },
  formContainer: {
    padding: 16,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors[colorScheme].text,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors[colorScheme].lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors[colorScheme].mediumGray,
  },
  typeButtonActive: {
    backgroundColor: Colors[colorScheme].primary,
    borderColor: Colors[colorScheme].primary,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors[colorScheme].text,
  },
  typeButtonTextActive: {
    color: 'white',
  },
  input: {
    backgroundColor: Colors[colorScheme].lightGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: Colors[colorScheme].text,
  },
  paymentContainer: {
    marginVertical: 12,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors[colorScheme].text,
    marginBottom: 8,
  },
  paymentButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors[colorScheme].lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors[colorScheme].mediumGray,
  },
  paymentButtonActive: {
    backgroundColor: Colors[colorScheme].primary,
    borderColor: Colors[colorScheme].primary,
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors[colorScheme].text,
  },
  paymentButtonTextActive: {
    color: 'white',
  },
  checkoutButton: {
    backgroundColor: Colors[colorScheme].primary,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 