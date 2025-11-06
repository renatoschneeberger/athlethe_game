export default function Card({ children, className = '', highlight = false, ...props }) {
  const baseClasses = 'bg-white rounded-lg shadow-md p-6 border';
  const highlightClasses = highlight ? 'border-blue-500 shadow-lg' : 'border-gray-200';
  
  return (
    <div className={`${baseClasses} ${highlightClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}

