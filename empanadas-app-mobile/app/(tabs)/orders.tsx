import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Pedido } from '@/types';
import { PedidosService } from '@/services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrdersScreen() {
  const colorScheme = useColorScheme() || 'light';
  const styles = createStyles(colorScheme);
  const router = useRouter();
  
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        
        // En una app real, buscaríamos los pedidos por usuario o por token
        // Para este ejemplo, simplemente mostraremos todos los pedidos
        const data = await PedidosService.getAll();
        setPedidos(data);
      } catch (err) {
        setError('Error al cargar los pedidos. Por favor, intenta de nuevo.');
        console.error('Error fetching pedidos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calcular el total de un pedido
  const calcularTotal = (pedido: Pedido) => {
    if (!pedido.Empanadas || pedido.Empanadas.length === 0) return "0.00";
    
    const total = pedido.Empanadas.reduce((sum, emp) => 
      sum + (emp.PedidoEmpanada.cantidad * Number(emp.PedidoEmpanada.precio)), 0
    );
    
    return total.toFixed(2);
  };

  // Colorear según estado
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return Colors[colorScheme].warning;
      case 'en preparación':
        return Colors[colorScheme].info;
      case 'listo':
        return Colors[colorScheme].success;
      case 'entregado':
        return Colors[colorScheme].success;
      case 'cancelado':
        return Colors[colorScheme].danger;
      default:
        return Colors[colorScheme].darkGray;
    }
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors[colorScheme].primary} />
        <Text style={styles.loadingText}>Cargando pedidos...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <FontAwesome name="exclamation-circle" size={40} color={Colors[colorScheme].danger} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Pedidos</Text>
      </View>
      
      {pedidos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome name="list-alt" size={60} color={Colors[colorScheme].darkGray} />
          <Text style={styles.emptyText}>Aún no has realizado ningún pedido</Text>
          <TouchableOpacity 
            style={styles.orderButton}
            onPress={() => router.push('/empanadas')}
          >
            <Text style={styles.orderButtonText}>Hacer un Pedido</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={pedidos.sort((a, b) => {
            // Ordenar por activos primero, luego por fecha (más recientes arriba)
            const aActive = a.estado !== 'entregado' && a.estado !== 'cancelado';
            const bActive = b.estado !== 'entregado' && b.estado !== 'cancelado';
            
            if (aActive && !bActive) return -1;
            if (!aActive && bActive) return 1;
            
            return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
          })}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>Pedido #{item.id}</Text>
                  <Text style={styles.orderDate}>{formatDate(item.createdAt || '')}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.estado || '') }]}>
                  <Text style={styles.statusText}>{item.estado}</Text>
                </View>
              </View>
              
              <View style={styles.orderDetails}>
                <Text style={styles.sectionTitle}>Empanadas:</Text>
                {item.Empanadas && item.Empanadas.map((emp) => (
                  <View key={emp.id} style={styles.empanadaItem}>
                    <Text style={styles.empanadaName}>{emp.gusto}</Text>
                    <Text style={styles.empanadaQuantity}>x{emp.PedidoEmpanada.cantidad}</Text>
                  </View>
                ))}
                
                <View style={styles.divider} />
                
                <View style={styles.deliveryInfo}>
                  <Text style={styles.sectionTitle}>
                    {item.tipo === 'delivery' ? 'Entrega a domicilio:' : 'Retirar en sucursal:'}
                  </Text>
                  {item.tipo === 'delivery' ? (
                    <Text style={styles.deliveryAddress}>
                      {item.direccion} {item.pisoDepto && `- ${item.pisoDepto}`}
                    </Text>
                  ) : (
                    <Text style={styles.deliveryAddress}>{item.sucursal}</Text>
                  )}
                </View>
                
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentMethod}>Pago con: {item.metodoPago}</Text>
                  <Text style={styles.orderTotal}>
                    Total: ${calcularTotal(item)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[colorScheme].background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors[colorScheme].background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors[colorScheme].text,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors[colorScheme].danger,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors[colorScheme].primary,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
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
    textAlign: 'center',
  },
  orderButton: {
    backgroundColor: Colors[colorScheme].primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  orderCard: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors[colorScheme].mediumGray,
    backgroundColor: Colors[colorScheme].background,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors[colorScheme].mediumGray,
    backgroundColor: Colors[colorScheme].lightGray,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors[colorScheme].text,
  },
  orderDate: {
    fontSize: 14,
    color: Colors[colorScheme].darkGray,
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme].text,
    marginBottom: 8,
  },
  empanadaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  empanadaName: {
    fontSize: 14,
    color: Colors[colorScheme].text,
  },
  empanadaQuantity: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors[colorScheme].text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors[colorScheme].mediumGray,
    marginVertical: 16,
  },
  deliveryInfo: {
    marginBottom: 16,
  },
  deliveryAddress: {
    fontSize: 14,
    color: Colors[colorScheme].text,
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethod: {
    fontSize: 14,
    color: Colors[colorScheme].text,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors[colorScheme].primary,
  },
}); 