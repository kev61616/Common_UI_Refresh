'use client'

import { QuestionViewProps } from './types';
import { CardDeckView as CardDeckViewImpl } from './CardDeckView';
import { KnowledgeTreeView as KnowledgeTreeViewImpl } from './KnowledgeTreeView';
import { HeatmapView as HeatmapViewImpl } from './HeatmapView';
import { ConceptMapView as ConceptMapViewImpl } from './ConceptMapView';
import { TagCloudView as TagCloudViewImpl } from './TagCloudView';
import { MatrixGridView as MatrixGridViewImpl } from './MatrixGridView';
import { DiagnosticDashboardView as DiagnosticDashboardViewImpl } from './DiagnosticDashboardView';
import { VennDiagramView as VennDiagramViewImpl } from './VennDiagramView';
import { ScatterPlotView as ScatterPlotViewImpl } from './ScatterPlotView';
import { QuestionJourneyView as QuestionJourneyViewImpl } from './QuestionJourneyView';
import { QuestionNetworkView as QuestionNetworkViewImpl } from './QuestionNetworkView';
import { SpiderChartView as SpiderChartViewImpl } from './SpiderChartView';
import { HistogramView as HistogramViewImpl } from './HistogramView';
import { AccordionCategoryView as AccordionCategoryViewImpl } from './AccordionCategoryView';
import { QuestionStackView as QuestionStackViewImpl } from './QuestionStackView';
import { BubblePackView as BubblePackViewImpl } from './BubblePackView';
import { QuestionTimelineView as QuestionTimelineViewImpl } from './QuestionTimelineView';

// Helper function for rendering placeholder components with numbered titles
function renderPlaceholder(props: QuestionViewProps, title: string, description: string) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">{title}</h3>
      <div className="min-h-[500px] flex justify-center items-center">
        <div className="text-center p-8 max-w-xl">
          <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg mb-8">
            <div className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-2">
              {title}
            </div>
            <p className="text-sky-600 dark:text-sky-400 text-sm">
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {props.practiceSets.slice(0, 4).map(set => (
              <div 
                key={set.id}
                onClick={() => props.onSelectSet(set.id)} 
                className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="font-medium">{set.subject}: {set.type}</div>
                <div className="flex justify-between mt-2">
                  <div className="text-sm">{set.accuracy}% accuracy</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Exported components - using actual implementations where available
export { CardDeckViewImpl as CardDeckView };
export { KnowledgeTreeViewImpl as KnowledgeTreeView };

export { DiagnosticDashboardViewImpl as DiagnosticDashboardView };

export { HeatmapViewImpl as HeatmapView };
export { ConceptMapViewImpl as ConceptMapView };
export { TagCloudViewImpl as TagCloudView };
export { MatrixGridViewImpl as MatrixGridView };

export { VennDiagramViewImpl as VennDiagramView };
export { ScatterPlotViewImpl as ScatterPlotView };
export { QuestionJourneyViewImpl as QuestionJourneyView };
export { QuestionNetworkViewImpl as QuestionNetworkView };
export { SpiderChartViewImpl as SpiderChartView };
export { HistogramViewImpl as HistogramView };
export { AccordionCategoryViewImpl as AccordionCategoryView };
export { QuestionStackViewImpl as QuestionStackView };
export { BubblePackViewImpl as BubblePackView };
export { QuestionTimelineViewImpl as QuestionTimelineView };

// Using placeholder for now while fixing issues with the MasteryPathView implementation
export function MasteryPathView(props: QuestionViewProps) {
  return renderPlaceholder(props, "19. Mastery Path View", "A learning path showing your progression toward mastery of topics.");
}

import { QuestionGalaxyView as QuestionGalaxyViewImpl } from './QuestionGalaxyView';
import { PeriodicTableView as PeriodicTableViewImpl } from './PeriodicTableView';
import { CircuitBoardView as CircuitBoardViewImpl } from './CircuitBoardView';
import { SolarSystemView as SolarSystemViewImpl } from './SolarSystemView';
import { MindMapView as MindMapViewImpl } from './MindMapView';
import { WatercolorGalleryView as WatercolorGalleryViewImpl } from './WatercolorGalleryView';
import { UrbanBlueprintView as UrbanBlueprintViewImpl } from './UrbanBlueprintView';
import { SteampunkMachineryView as SteampunkMachineryViewImpl } from './SteampunkMachineryView';
import { BookshelfView as BookshelfViewImpl } from './BookshelfView';

export { QuestionGalaxyViewImpl as QuestionGalaxyView };
export { PeriodicTableViewImpl as PeriodicTableView };
export { CircuitBoardViewImpl as CircuitBoardView };
export { SolarSystemViewImpl as SolarSystemView };
export { MindMapViewImpl as MindMapView };
export { WatercolorGalleryViewImpl as WatercolorGalleryView };
export { UrbanBlueprintViewImpl as UrbanBlueprintView };
export { SteampunkMachineryViewImpl as SteampunkMachineryView };
export { BookshelfViewImpl as BookshelfView };

import { VintageBotanicalView as VintageBotanicalViewImpl } from './VintageBotanicalView';
import { InfographicDashboardView as InfographicDashboardViewImpl } from './InfographicDashboardView';
import { FilmStripView as FilmStripViewImpl } from './FilmStripView';

export { VintageBotanicalViewImpl as VintageBotanicalView };
export { InfographicDashboardViewImpl as InfographicDashboardView };
export { FilmStripViewImpl as FilmStripView };

import { AncientScrollView as AncientScrollViewImpl } from './AncientScrollView';

export { AncientScrollViewImpl as AncientScrollView };

import { StainedGlassView as StainedGlassViewImpl } from './StainedGlassView';

export { StainedGlassViewImpl as StainedGlassView };

import { WeatherMapView as WeatherMapViewImpl } from './WeatherMapView';

export { WeatherMapViewImpl as WeatherMapView };

import { GradientFlowView as GradientFlowViewImpl } from './GradientFlowView';

export { GradientFlowViewImpl as GradientFlowView };
