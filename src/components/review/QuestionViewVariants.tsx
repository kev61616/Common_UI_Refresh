'use client'

import { PracticeSet } from '@/lib/mockData'
import { QuestionView } from './QuestionView'
import {
  CardDeckView,
  KnowledgeTreeView,
  DiagnosticDashboardView,
  HeatmapView,
  ConceptMapView,
  TagCloudView,
  MatrixGridView,
  VennDiagramView,
  ScatterPlotView,
  QuestionJourneyView,
  QuestionNetworkView,
  SpiderChartView,
  HistogramView,
  AccordionCategoryView,
  QuestionStackView,
  BubblePackView,
  QuestionTimelineView,
  MasteryPathView,
  QuestionGalaxyView,
  PeriodicTableView,
  CircuitBoardView,
  SolarSystemView,
  MindMapView,
  WatercolorGalleryView,
  UrbanBlueprintView,
  SteampunkMachineryView,
  BookshelfView,
  VintageBotanicalView,
  InfographicDashboardView,
  FilmStripView,
  AncientScrollView,
  StainedGlassView,
  WeatherMapView,
  GradientFlowView
} from './question-view-variants'

// Type for the variant prop
export type QuestionViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35

interface QuestionViewVariantsProps {
  variant: QuestionViewVariant
  practiceSets: PracticeSet[]
  onSelectSet: (id: string) => void
  selectedSetId: string | null
}

/**
 * QuestionViewVariants - Component that renders the appropriate question view based on the variant prop
 */
export function QuestionViewVariants({ variant, practiceSets, onSelectSet, selectedSetId }: QuestionViewVariantsProps) {
  const commonProps = {
    practiceSets,
    onSelectSet,
    selectedSetId
  };

  // Render the correct component based on the variant number
  switch (variant) {
    case 1:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-center">1. Standard Question View</h3>
          <QuestionView {...commonProps} />
        </div>
      );
    case 2:
      return <CardDeckView {...commonProps} />;
    case 3:
      return <KnowledgeTreeView {...commonProps} />;
    case 4:
      return <DiagnosticDashboardView {...commonProps} />;
    case 5:
      return <HeatmapView {...commonProps} />;
    case 6:
      return <ConceptMapView {...commonProps} />;
    case 7:
      return <TagCloudView {...commonProps} />;
    case 8:
      return <MatrixGridView {...commonProps} />;
    case 9:
      return <VennDiagramView {...commonProps} />;
    case 10:
      return <ScatterPlotView {...commonProps} />;
    case 11:
      return <QuestionJourneyView {...commonProps} />;
    case 12:
      return <QuestionNetworkView {...commonProps} />;
    case 13:
      return <SpiderChartView {...commonProps} />;
    case 14:
      return <HistogramView {...commonProps} />;
    case 15:
      return <AccordionCategoryView {...commonProps} />;
    case 16:
      return <QuestionStackView {...commonProps} />;
    case 17:
      return <BubblePackView {...commonProps} />;
    case 18:
      return <QuestionTimelineView {...commonProps} />;
    case 19:
      return <MasteryPathView {...commonProps} />;
    case 20:
      return <QuestionGalaxyView {...commonProps} />;
    case 21:
      return <PeriodicTableView {...commonProps} />;
    case 22:
      return <CircuitBoardView {...commonProps} />;
    case 23:
      return <SolarSystemView {...commonProps} />;
    case 24:
      return <MindMapView {...commonProps} />;
    case 25:
      return <WatercolorGalleryView {...commonProps} />;
    case 26:
      return <UrbanBlueprintView {...commonProps} />;
    case 27:
      return <SteampunkMachineryView {...commonProps} />;
    case 28:
      return <BookshelfView {...commonProps} />;
    case 29:
      return <VintageBotanicalView {...commonProps} />;
    case 30:
      return <InfographicDashboardView {...commonProps} />;
    case 31:
      return <FilmStripView {...commonProps} />;
    case 32:
      return <AncientScrollView {...commonProps} />;
    case 33:
      return <StainedGlassView {...commonProps} />;
    case 34:
      return <WeatherMapView {...commonProps} />;
    case 35:
      return <GradientFlowView {...commonProps} />;
    default:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-center">Question View {variant}</h3>
          <div className="min-h-[500px] flex justify-center items-center">
            <div className="text-center p-8">
              <p className="text-lg font-medium mb-4">Question View {variant} Implementation</p>
            </div>
          </div>
        </div>
      );
  }
}
