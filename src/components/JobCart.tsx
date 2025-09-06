import React from "react";

interface Job {
  id: number;
  title: string;
  description: string;
  url?: string;
}

interface JobCartProps {
  job: Job;
  completedCourses: string[]; 
}

const JobCart = ({ job, completedCourses }: JobCartProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm my-3">
      <p className="text-gray-700 mb-2">
        Eğer{" "}
        <span className="font-semibold text-blue-600">
          {completedCourses.join(", ")}
        </span>{" "}
        kurslarını tamamlarsan{" "}
        <span className="font-semibold text-gray-900">{job.title}</span>{" "}
        pozisyonuna uygun olabilirsin.
      </p>

      <details className="mt-2">
        <summary className="cursor-pointer text-sm text-blue-500 hover:underline">
          Detayları Gör
        </summary>
        <p className="text-sm text-gray-600 mt-2">{job.description}</p>
        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:underline mt-2 block"
          >
            İlanı Görüntüle
          </a>
        )}
      </details>
    </div>
  );
};

export default JobCart;
