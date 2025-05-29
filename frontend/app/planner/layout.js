import './styles.css';

export const metadata = {
  title: 'Plan Your Trip with AI | Raahein',
  description: 'Let our AI travel genie help you plan your perfect trip. Answer a few questions and get personalized travel suggestions based on your preferences.',
};

export default function PlanWithAILayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {children}
    </div>
  );
} 