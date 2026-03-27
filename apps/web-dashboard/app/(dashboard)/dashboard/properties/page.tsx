'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/api-client';

interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  description?: string;
  photos?: string[];
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<{ success: boolean; data: Property[] }>('/properties');
      setProperties(response.data || []);
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proprietăți</h1>
          <p className="mt-2 text-gray-600">
            Gestionează proprietățile tale de închiriat
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Proprietate
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Se încarcă...</p>
        </div>
      ) : properties.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <p className="text-gray-600 mb-4">
              Nu ai încă proprietăți adăugate
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adaugă Prima Proprietate
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{property.name}</CardTitle>
                <CardDescription>
                  {property.city}, {property.country}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">{property.address}</p>
                  <div className="flex gap-4 text-gray-500">
                    <span>{property.bedrooms} dormitoare</span>
                    <span>{property.bathrooms} băi</span>
                  </div>
                  {property.description && (
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {property.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Detalii
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Editează
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
