'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export const MedievalManuscriptView: React.FC<SetViewProps> = ({
  sets,
  selectedSetId,
  onSelectSet,
  isLoading = false
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center" data-oid="m:xjgx5">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" data-oid="sgy0q:8"></div>
      </div>);

  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-amber-50 border border-amber-200 rounded-lg" data-oid="_y38nj7">
        <p className="text-amber-800 font-serif italic" data-oid="9hv8h0p">No manuscripts available in the archives</p>
      </div>);

  }

  // Group sets by their subject area for illuminated sections
  const groupedSets = sets.reduce((acc, set) => {
    const subject = set.subject || 'Miscellaneous';
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(set);
    return acc;
  }, {} as Record<string, typeof sets>);

  return (
    <div className="p-1 md:p-4" data-oid="jrn.:et">
      <div className="bg-[#f5edd0] rounded-lg overflow-hidden shadow-xl border-4 border-[#8B5A2B] relative" data-oid="vuev2ji">
        {/* Decorative corner flourishes */}
        <div className="absolute top-0 left-0 w-16 h-16 border-b-4 border-r-4 border-[#8B5A2B] rounded-br-xl" data-oid="gh17os5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-b-4 border-l-4 border-[#8B5A2B] rounded-bl-xl" data-oid="m4bqhl6"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-t-4 border-r-4 border-[#8B5A2B] rounded-tr-xl" data-oid="qkmg0:p"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-t-4 border-l-4 border-[#8B5A2B] rounded-tl-xl" data-oid="ify8m8t"></div>
        
        {/* Title Heading with illuminated capital */}
        <div className="text-center py-6 font-serif border-b-4 border-[#8B5A2B]" data-oid="ard42cg">
          <h2 className="text-3xl text-[#5B3A1F] flex items-center justify-center" data-oid="t1dy_p4">
            <span className="inline-block relative text-5xl font-bold text-[#8B0000] mr-1" data-oid="clistjq">
              C
              <span className="absolute -top-1 -left-1 text-[#bf9b30] opacity-80 text-5xl" data-oid="qc0n0kl">C</span>
            </span>
            <span data-oid="80kiaxe">odex Practicum</span>
          </h2>
          <p className="text-[#5B3A1F] italic mt-1 text-sm" data-oid="950e48s">Anno Domini MMXXV</p>
        </div>
        
        {/* Main content with illuminated margins */}
        <div className="relative p-6 md:p-10 border-4 border-[#f5edd0] m-4 bg-[#f7f2e2]" data-oid="33l6e5a">
          {/* Left margin decorative pattern */}
          <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-[#cd9c5a] bg-opacity-20 flex flex-col items-center" data-oid="f:tl27i">
            {Array(10).fill(0).map((_, i) =>
            <div
              key={`left-deco-${i}`}
              className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-[#8B5A2B] mt-6"
              style={{ backgroundColor: i % 3 === 0 ? '#bf9b30' : i % 3 === 1 ? '#8B0000' : '#2E4372' }} data-oid="si_x3cn">
            </div>
            )}
          </div>
          
          {/* Set listings as manuscript content */}
          <div className="ml-8 md:ml-10" data-oid="g1qoh_6">
            {Object.entries(groupedSets).map(([subject, subjectSets], subjectIndex) =>
            <div key={subject} className="mb-10" data-oid="ilq9u1c">
                {/* Illuminated subject heading */}
                <h3 className="text-xl text-[#5B3A1F] font-serif mb-4 flex items-center" data-oid="-grn2tn">
                  <span className={`inline-block w-8 h-8 mr-2 rounded-full flex items-center justify-center text-white font-bold 
                    ${subjectIndex % 3 === 0 ? 'bg-[#8B0000]' : subjectIndex % 3 === 1 ? 'bg-[#2E4372]' : 'bg-[#556B2F]'}`} data-oid="j33vxtl">
                    {subject.charAt(0)}
                  </span>
                  <span className="border-b border-[#8B5A2B] pb-1 flex-1" data-oid="i0hi7hc">{subject}</span>
                </h3>
                
                {/* Sets for this subject */}
                <div className="pl-10 space-y-4" data-oid="54hl-fr">
                  {subjectSets.map((set) =>
                <div
                  key={set.id}
                  onClick={() => onSelectSet(set.id)}
                  className={`
                        p-3 rounded cursor-pointer relative transition-all duration-300
                        ${selectedSetId === set.id ?
                  'bg-[#bf9b30] bg-opacity-20 shadow-inner' :
                  'hover:bg-[#f5edd0] hover:shadow'}
                      `
                  } data-oid="fr9j:3h">

                      {/* Decorative initial capital for selected set */}
                      {selectedSetId === set.id &&
                  <span className="absolute -left-8 top-2 text-2xl font-bold text-[#8B0000]" data-oid="6jp7rw9">❧</span>
                  }
                      
                      <h4 className="font-serif text-[#5B3A1F] text-lg font-medium" data-oid="hw0l0yl">
                        {set.title}
                      </h4>
                      
                      <div className="mt-1 text-sm text-[#5B3A1F] flex items-center" data-oid="o8qb2_k">
                        <span className="inline-block w-3 h-3 mr-1 bg-[#8B5A2B] rounded-full opacity-60" data-oid="2-0mi_n"></span>
                        <span className="italic" data-oid="ak10mn5">{set.questions.length} questions</span>
                        
                        <span className="mx-2 text-[#8B5A2B]" data-oid="2nb6m-b">•</span>
                        
                        <span className="italic" data-oid="7bmygbw">
                          {set.completedCount}/{set.questions.length} completed
                        </span>
                        
                        {set.lastReviewed &&
                    <>
                            <span className="mx-2 text-[#8B5A2B]" data-oid="mz-gvjd">•</span>
                            <span className="italic" data-oid="imxud1.">Last studied: {new Date(set.lastReviewed).toLocaleDateString()}</span>
                          </>
                    }
                      </div>
                      
                      {/* Completion indicator as illuminated bar */}
                      <div className="mt-2 h-2 bg-[#f5edd0] rounded overflow-hidden" data-oid="n.-y2g4">
                        <div
                      className="h-full bg-[#8B0000]"
                      style={{
                        width: `${set.completedCount / set.questions.length * 100}%`,
                        backgroundImage: 'linear-gradient(90deg, #8B0000, #bf9b30)'
                      }} data-oid="wilih-l">
                    </div>
                      </div>
                    </div>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer with illuminated content */}
        <div className="border-t-4 border-[#8B5A2B] p-4 text-center font-serif text-sm text-[#5B3A1F] italic" data-oid="ozj.jzy">
          <p data-oid="bf-96jy">Scriptus per manus Claude in annum MMXXV</p>
          <div className="flex justify-center mt-2 space-x-4" data-oid="oj3z.16">
            {[0, 1, 2].map((i) =>
            <div
              key={`footer-${i}`}
              className="w-6 h-6 rounded-full border-2 border-[#8B5A2B]"
              style={{
                backgroundColor: i === 0 ? '#bf9b30' : i === 1 ? '#8B0000' : '#2E4372',
                opacity: 0.7
              }} data-oid="hvb-xr3">
            </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};