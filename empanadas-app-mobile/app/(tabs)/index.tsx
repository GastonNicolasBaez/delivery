import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const styles = createStyles(colorScheme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Banner */}
        <View style={styles.banner}>
          <Image 
            source={require('../../assets/images/banner-placeholder.png')} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <Text style={styles.bannerTitle}>Las mejores empanadas</Text>
            <Text style={styles.bannerSubtitle}>Hechas con amor</Text>
          </View>
        </View>

        {/* Acciones rápidas */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/empanadas')}
          >
            <FontAwesome name="cutlery" size={32} color={Colors[colorScheme].primary} />
            <Text style={styles.actionText}>Ver menú</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/cart')}
          >
            <FontAwesome name="shopping-cart" size={32} color={Colors[colorScheme].primary} />
            <Text style={styles.actionText}>Mi carrito</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/orders')}
          >
            <FontAwesome name="list-alt" size={32} color={Colors[colorScheme].primary} />
            <Text style={styles.actionText}>Mis pedidos</Text>
          </TouchableOpacity>
        </View>

        {/* Ofertas o promociones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promociones Especiales</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoContainer}>
            <View style={styles.promoCard}>
              <Image 
                source={require('../../assets/images/promo1-placeholder.png')} 
                style={styles.promoImage}
                resizeMode="cover"
              />
              <View style={styles.promoContent}>
                <Text style={styles.promoTitle}>Docena Mixta</Text>
                <Text style={styles.promoDesc}>12 empanadas variadas con bebida</Text>
                <Text style={styles.promoPrice}>$2500</Text>
              </View>
            </View>
            
            <View style={styles.promoCard}>
              <Image 
                source={require('../../assets/images/promo2-placeholder.png')} 
                style={styles.promoImage}
                resizeMode="cover"
              />
              <View style={styles.promoContent}>
                <Text style={styles.promoTitle}>Combo Amigos</Text>
                <Text style={styles.promoDesc}>6 empanadas + papas + bebida</Text>
                <Text style={styles.promoPrice}>$1500</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Más info o características */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Por qué elegirnos?</Text>
          
          <View style={styles.featureRow}>
            <FontAwesome name="star" size={20} color={Colors[colorScheme].primary} />
            <Text style={styles.featureText}>Ingredientes frescos y de calidad</Text>
          </View>
          
          <View style={styles.featureRow}>
            <FontAwesome name="clock-o" size={20} color={Colors[colorScheme].primary} />
            <Text style={styles.featureText}>Entrega rápida y puntual</Text>
          </View>
          
          <View style={styles.featureRow}>
            <FontAwesome name="thumbs-up" size={20} color={Colors[colorScheme].primary} />
            <Text style={styles.featureText}>Recetas tradicionales</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[colorScheme].background,
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: Colors[colorScheme].lightGray,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  actionText: {
    marginTop: 8,
    color: Colors[colorScheme].text,
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    padding: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors[colorScheme].text,
  },
  promoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  promoCard: {
    width: 250,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors[colorScheme].mediumGray,
    backgroundColor: Colors[colorScheme].background,
  },
  promoImage: {
    width: '100%',
    height: 120,
  },
  promoContent: {
    padding: 10,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors[colorScheme].text,
  },
  promoDesc: {
    fontSize: 14,
    color: Colors[colorScheme].darkGray,
    marginTop: 4,
  },
  promoPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors[colorScheme].primary,
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors[colorScheme].text,
  },
});
