import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import categoriesData from '../data/categorias.json';
import { FaCogs, FaCar, FaBolt, FaWrench, FaCircle, FaCarSide, FaCog, FaTachometerAlt, FaScrewdriver, FaPlug, FaMotorcycle } from 'react-icons/fa';

const iconsMap = {
  FaCogs: FaCogs,
  FaCar: FaCar,
  FaBolt: FaBolt,
  FaWrench: FaWrench,
  FaCircle: FaCircle,
  FaCarSide: FaCarSide,
  FaCog: FaCog,
  FaTachometerAlt: FaTachometerAlt,
  FaScrewdriver: FaScrewdriver,
  FaPlug: FaPlug,
  FaMotorcycle: FaMotorcycle
};

const SidebarContainer = styled.div`
  width: ${({ compact }) => (compact ? '90px' : '400px')};
  height: 100vh;
  background-color: #f4f4f4;
  padding: 16px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: ${({ compact }) => (compact ? 'center' : 'flex-start')};
`;

const Category = styled.div`
  margin-bottom: 16px;
  font-size: ${({ compact }) => (compact ? '20px' : '16px')};
  cursor: pointer;
  text-align: ${({ compact }) => (compact ? 'center' : 'left')};
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const CategoryIcon = styled.div`
  font-size: 20px;
  margin-right: ${({ compact }) => (compact ? '0' : '8px')};
  margin-bottom: ${({ compact }) => (compact ? '8px' : '0')};
`;

const CategoryName = styled.div`
  display: ${({ compact }) => (compact ? 'none' : 'block')};
`;

const ToggleButton = styled.button`
  margin-top: auto;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [compact, setCompact] = useState(window.innerWidth < 768);

  useEffect(() => {
    setCategories(categoriesData);
    const handleResize = () => setCompact(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarContainer compact={compact}>
      <h2 style={{ display: compact ? 'none' : 'block' }}>Categorias</h2>
      {categories.map(category => {
        const IconComponent = iconsMap[category.icone];
        return (
          <Category key={category.id} compact={compact}>
            <CategoryIcon compact={compact}>
              <IconComponent />
            </CategoryIcon>
            <CategoryName compact={compact}>{category.categoria.replace(/_/g, ' ')}</CategoryName>
          </Category>
        );
      })}
      <ToggleButton onClick={() => setCompact(!compact)}>
        {compact ? 'Expandir' : 'Contrair'}
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
