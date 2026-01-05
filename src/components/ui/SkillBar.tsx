import React from 'react'

interface SkillBarProps {
  name: string
  percentage: number
  category: 'technical' | 'soft'
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, category }) => {
  const getBarColor = () => {
    if (category === 'technical') {
      return 'bg-blue-500'
    }
    return 'bg-purple-500'
  }

  const getBackgroundColor = () => {
    if (category === 'technical') {
      return 'bg-blue-100 dark:bg-blue-900/20'
    }
    return 'bg-purple-100 dark:bg-purple-900/20'
  }

  return (
    <div className="mb-6">
      {/* Skill Name and Percentage */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {name}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className={`w-full h-2 ${getBackgroundColor()} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${getBarColor()} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

export default SkillBar