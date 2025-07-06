'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: IconProp;
    color: string;
    subtitle?: string;
}

export default function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow h-32 flex flex-col justify-between">
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2 truncate">
                        {value}
                    </p>
                </div>
                <div className={`p-3 rounded-full ${color} flex-shrink-0`}>
                    <FontAwesomeIcon 
                        icon={icon} 
                        className="text-white" 
                        style={{ fontSize: "24px" }} 
                    />
                </div>
            </div>
            {subtitle && (
                <p className="text-sm text-gray-600 mt-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
