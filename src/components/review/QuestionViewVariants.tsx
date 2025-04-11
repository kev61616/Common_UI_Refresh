'use client';

import { PracticeSet } from '@/lib/mockData';
import { QuestionView } from './QuestionView';
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
  GradientFlowView } from
'./question-view-variants';

// Type for the variant prop
export type QuestionViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35;

interface QuestionViewVariantsProps {
  variant: QuestionViewVariant;
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
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
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="c02wdw.">
          <h3 className="text-xl font-bold mb-6 text-center" data-oid="vptt9tl">1. Standard Question View</h3>
          <QuestionView {...commonProps} data-oid=":iqj7e1" />
        </div>);

    case 2:
      return <CardDeckView {...commonProps} data-oid="26nu11x" />;
    case 3:
      return <KnowledgeTreeView {...commonProps} data-oid="3_knb5e" />;
    case 4:
      return <DiagnosticDashboardView {...commonProps} data-oid="ghg.4:8" />;
    case 5:
      return <HeatmapView {...commonProps} data-oid="mujt2d8" />;
    case 6:
      return <ConceptMapView {...commonProps} data-oid="nfp8c2a" />;
    case 7:
      return <TagCloudView {...commonProps} data-oid="745.:iq" />;
    case 8:
      return <MatrixGridView {...commonProps} data-oid="uh0uyxb" />;
    case 9:
      return <VennDiagramView {...commonProps} data-oid="zbpj0zo" />;
    case 10:
      return <ScatterPlotView {...commonProps} data-oid="lw-rmgn" />;
    case 11:
      return <QuestionJourneyView {...commonProps} data-oid="y7t1a0u" />;
    case 12:
      return <QuestionNetworkView {...commonProps} data-oid="5v75foc" />;
    case 13:
      return <SpiderChartView {...commonProps} data-oid="v1.hdpa" />;
    case 14:
      return <HistogramView {...commonProps} data-oid="-1tj4dv" />;
    case 15:
      return <AccordionCategoryView {...commonProps} data-oid=":c79xfl" />;
    case 16:
      return <QuestionStackView {...commonProps} data-oid="20lsycg" />;
    case 17:
      return <BubblePackView {...commonProps} data-oid="vldcz59" />;
    case 18:
      return <QuestionTimelineView {...commonProps} data-oid="6ee0nqj" />;
    case 19:
      return <MasteryPathView {...commonProps} data-oid="e44343:" />;
    case 20:
      return <QuestionGalaxyView {...commonProps} data-oid="sax19bd" />;
    case 21:
      return <PeriodicTableView {...commonProps} data-oid="c26ol7." />;
    case 22:
      return <CircuitBoardView {...commonProps} data-oid="09hjwwg" />;
    case 23:
      return <SolarSystemView {...commonProps} data-oid="zj9-c5c" />;
    case 24:
      return <MindMapView {...commonProps} data-oid="g3lob0a" />;
    case 25:
      return <WatercolorGalleryView {...commonProps} data-oid="5emvw0q" />;
    case 26:
      return <UrbanBlueprintView {...commonProps} data-oid="oy9pq7c" />;
    case 27:
      return <SteampunkMachineryView {...commonProps} data-oid="pg_oqpx" />;
    case 28:
      return <BookshelfView {...commonProps} data-oid="1xam-j6" />;
    case 29:
      return <VintageBotanicalView {...commonProps} data-oid="6uidd9n" />;
    case 30:
      return <InfographicDashboardView {...commonProps} data-oid="_e:03q3" />;
    case 31:
      return <FilmStripView {...commonProps} data-oid="r1or2px" />;
    case 32:
      return <AncientScrollView {...commonProps} data-oid="7119pwz" />;
    case 33:
      return <StainedGlassView {...commonProps} data-oid="fgoexwq" />;
    case 34:
      return <WeatherMapView {...commonProps} data-oid="lcxgzx3" />;
    case 35:
      return <GradientFlowView {...commonProps} data-oid=".ajknar" />;
    default:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="39rg1::">
          <h3 className="text-xl font-bold mb-6 text-center" data-oid=":2wjqi3">Question View {variant}</h3>
          <div className="min-h-[500px] flex justify-center items-center" data-oid="u3gg9mi">
            <div className="text-center p-8" data-oid=".wpa4xj">
              <p className="text-lg font-medium mb-4" data-oid="d84rqa4">Question View {variant} Implementation</p>
            </div>
          </div>
        </div>);

  }
}