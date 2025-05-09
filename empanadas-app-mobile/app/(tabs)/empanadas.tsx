import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Empanada } from '@/types';
import { EmpanadasService } from '@/services/ApiService';
import { useCart } from '@/context/CartContext';

export default function EmpanadasScreen() {
  const colorScheme = useColorScheme() || 'light';
  const styles = createStyles(colorScheme);
  const { addToCart } = useCart();
  
  const [empanadas, setEmpanadas] = useState<Empanada[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpanadas = async () => {
      try {
        setLoading(true);
        const data = await EmpanadasService.getAll();
        setEmpanadas(data);
        
        // Extraer categorías únicas
        const uniqueCategories = Array.from(new Set(data.map(emp => emp.categoria)));
        setCategories(uniqueCategories);
        
        // Seleccionar la primera categoría por defecto
        if (uniqueCategories.length > 0 && !selectedCategory) {
          setSelectedCategory(uniqueCategories[0]);
        }
      } catch (err) {
        setError('Error al cargar las empanadas. Por favor, intenta de nuevo.');
        console.error('Error fetching empanadas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpanadas();
  }, []);

  const handleAddToCart = (empanada: Empanada) => {
    addToCart({
      id: empanada.id,
      gusto: empanada.gusto,
      cantidad: 1,
      precio: empanada.precio,
      categoria: empanada.categoria
    });
  };

  // Filtrar empanadas por categoría seleccionada
  const filteredEmpanadas = selectedCategory 
    ? empanadas.filter(emp => emp.categoria === selectedCategory)
    : empanadas;

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors[colorScheme].primary} />
        <Text style={styles.loadingText}>Cargando menú...</Text>
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
        <Text style={styles.title}>Nuestras Empanadas</Text>
      </View>
      
      {/* Categorías */}
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.categoryTextActive
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      {/* Lista de empanadas */}
      <FlatList
        data={filteredEmpanadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.empanadaInfo}>
                <Text style={styles.empanadaName}>{item.gusto}</Text>
                <Text style={styles.empanadaDescription}>{item.descripcion}</Text>
                <Text style={styles.empanadaPrice}>${item.precio}</Text>
              </View>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
              >
                <FontAwesome name="plus" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No hay empanadas disponibles en esta categoría
            </Text>
          </View>
        }
      />
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
  categoryContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors[colorScheme].mediumGray,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: Colors[colorScheme].lightGray,
  },
  categoryButtonActive: {
    backgroundColor: Colors[colorScheme].primary,
  },
  categoryText: {
    color: Colors[colorScheme].text,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: 'white',
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors[colorScheme].mediumGray,
    backgroundColor: Colors[colorScheme].background,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  empanadaInfo: {
    flex: 1,
  },
  empanadaName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors[colorScheme].text,
  },
  empanadaDescription: {
    marginTop: 4,
    fontSize: 14,
    color: Colors[colorScheme].darkGray,
  },
  empanadaPrice: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors[colorScheme].primary,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors[colorScheme].primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors[colorScheme].darkGray,
    textAlign: 'center',
  },
}); 