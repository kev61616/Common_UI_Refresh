# User Flow Diagrams

This document contains detailed mermaid charts visualizing both the current and optimized user flows for the educational platform.

## Application Structure Overview

```mermaid
graph TD
    classDef mainSection fill:#f9d5e5,stroke:#333,stroke-width:2px;
    classDef subSection fill:#eeeeee,stroke:#333,stroke-width:1px;
    classDef interaction fill:#e3f2fd,stroke:#333,stroke-width:1px;
    
    App[Educational Platform] --> Dashboard
    App --> Profile
    App --> Course
    App --> QuestionBank[Question Bank]
    App --> Review
    App --> MockTest[Mock Test]
    
    Profile --> Overview
    Profile --> Reading
    Profile --> Writing
    Profile --> Math
    
    Overview --> Cards[Draggable Cards]
    Overview --> Summary[Progress Summary]
    
    Reading --> ReadingSkills[Skills Analysis]
    Reading --> ReadingProgress[Progress Tracking]
    
    Writing --> WritingSkills[Skills Analysis]
    Writing --> WritingProgress[Progress Tracking]
    
    Math --> MathSkills[Skills Analysis]
    Math --> MathProgress[Progress Tracking]
    
    Course --> CourseContent[Learning Material]
    Course --> Exercises
    
    QuestionBank --> Questions
    QuestionBank --> Topics
    QuestionBank --> Difficulty
    
    Review --> Feedback
    Review --> Performance
    
    MockTest --> TestContent[Test Questions]
    MockTest --> Results
    
    Dashboard:::mainSection
    Profile:::mainSection
    Course:::mainSection
    QuestionBank:::mainSection
    Review:::mainSection
    MockTest:::mainSection
    
    Overview:::subSection
    Reading:::subSection
    Writing:::subSection
    Math:::subSection
    
    Cards:::interaction
    ReadingSkills:::interaction
    WritingSkills:::interaction
    MathSkills:::interaction
    Questions:::interaction
```

## Current User Flow with Pain Points

```mermaid
graph TD
    classDef painPoint fill:#ffcccb,stroke:#ff0000,stroke-width:2px;
    classDef normalStep fill:#e0f7fa,stroke:#333,stroke-width:1px;
    
    Start[User Login] --> Dashboard
    
    Dashboard --> Profile
    Dashboard --> Course
    Dashboard --> QuestionBank[Question Bank]
    Dashboard --> MockTest[Mock Test]
    
    Profile --> LoadProfile[Load Profile Data]
    LoadProfile --> LoadDelayA[Loading Delay]:::painPoint
    LoadProfile --> HydrationA[Hydration Issues]:::painPoint
    LoadDelayA --> Overview
    HydrationA --> Overview
    
    Overview --> Cards[Interacting with Cards]
    Cards --> DnDComplexity[Drag-and-Drop Complexity]:::painPoint
    Cards --> PerformanceIssues[Performance Issues]:::painPoint
    
    Overview --> TabNav[Navigate to Subject Tab]
    TabNav --> Loading[Load Tab Data]
    Loading --> LoadDelayB[Loading Delay]:::painPoint
    LoadDelayB --> SubjectView[Subject Tab View]
    
    SubjectView --> DisconnectedViz[Disconnected Visualizations]:::painPoint
    SubjectView --> ScrollingOverload[Scrolling Overload]:::painPoint
    
    Course --> CourseContent[View Course Content]
    CourseContent --> ManualNav[Manual Navigation to Practice]:::painPoint
    ManualNav --> QuestionBank
    
    QuestionBank --> Questions[Answer Questions]
    Questions --> ManualNavB[Manual Navigation to Review]:::painPoint
    ManualNavB --> Review
    
    Review --> ManualNavC[Manual Navigation to Test]:::painPoint
    ManualNavC --> MockTest
    
    MockTest --> Results[View Results]
    Results --> UnclearNextSteps[Unclear Next Steps]:::painPoint
    
    Dashboard:::normalStep
    Profile:::normalStep
    Course:::normalStep
    QuestionBank:::normalStep
    Review:::normalStep
    MockTest:::normalStep
    Overview:::normalStep
    SubjectView:::normalStep
    CourseContent:::normalStep
    Questions:::normalStep
    Results:::normalStep
```

## Optimized User Flow - Overview

```mermaid
graph TD
    classDef optimizedStep fill:#c8e6c9,stroke:#388e3c,stroke-width:2px;
    classDef normalStep fill:#e0f7fa,stroke:#333,stroke-width:1px;
    
    Start[User Login] --> Dashboard
    
    Dashboard --> SmartProgress[Smart Progress Overview]:::optimizedStep
    Dashboard --> SuggestedCourse[Suggested Next Course]:::optimizedStep
    
    SmartProgress --> Profile
    SuggestedCourse --> Course
    
    Profile --> LazyLoading[Progressive Loading]:::optimizedStep
    LazyLoading --> Overview
    
    Overview --> SimpleView[Simple Card View]:::optimizedStep
    SimpleView --> EditMode[Optional Edit Mode]:::optimizedStep
    EditMode --> DnD[Drag-and-Drop When Needed]:::optimizedStep
    
    Overview --> IntelligentLinks[Intelligent Card Links]:::optimizedStep
    IntelligentLinks --> SubjectTabs[Subject Tabs]
    
    SubjectTabs --> ContextualUI[Contextual UI]:::optimizedStep
    SubjectTabs --> ViewportLoading[Viewport-Based Loading]:::optimizedStep
    
    ContextualUI --> RelatedContent[Related Content Links]:::optimizedStep
    ViewportLoading --> OptimizedViz[Optimized Visualizations]:::optimizedStep
    
    Course --> CourseContent[Course Content]
    CourseContent --> ContextualPractice[Practice This Concept Button]:::optimizedStep
    ContextualPractice --> QuestionBank[Question Bank]
    
    QuestionBank --> Questions[Answer Questions]
    Questions --> ContextualReview[Review Results Button]:::optimizedStep
    ContextualReview --> Review
    
    Review --> ContextualTest[Test Your Knowledge Button]:::optimizedStep
    ContextualTest --> MockTest[Mock Test]
    
    MockTest --> Results[View Results]
    Results --> LearningPath[Learning Path Suggestion]:::optimizedStep
    LearningPath --> Dashboard
    
    Dashboard:::normalStep
    Profile:::normalStep
    Course:::normalStep
    QuestionBank:::normalStep
    Review:::normalStep
    MockTest:::normalStep
    Overview:::normalStep
    SubjectTabs:::normalStep
    CourseContent:::normalStep
    Questions:::normalStep
    Results:::normalStep
```

## Detailed Learning Journey - Optimized Flow

```mermaid
graph LR
    classDef mainNode fill:#bbdefb,stroke:#1976d2,stroke-width:2px;
    classDef pathNode fill:#c8e6c9,stroke:#388e3c,stroke-width:1px;
    classDef actionNode fill:#fff9c4,stroke:#fbc02d,stroke-width:1px;
    
    Dashboard:::mainNode --> RecommendA[Recommended Course A]:::pathNode
    Dashboard --> RecommendB[Recommended Course B]:::pathNode
    Dashboard --> ViewAll[View All Courses]:::actionNode
    
    RecommendA --> CourseA[Course Content A]:::mainNode
    RecommendB --> CourseB[Course Content B]:::mainNode
    ViewAll --> CourseList[Course Listing]:::mainNode
    CourseList --> CourseSelection[Select Course]:::actionNode
    CourseSelection --> CourseC[Course Content C]:::mainNode
    
    CourseA --> PracticeA[Practice Button]:::actionNode
    CourseB --> PracticeB[Practice Button]:::actionNode
    CourseC --> PracticeC[Practice Button]:::actionNode
    
    PracticeA --> QBankA[Question Bank - Topic A]:::mainNode
    PracticeB --> QBankB[Question Bank - Topic B]:::mainNode
    PracticeC --> QBankC[Question Bank - Topic C]:::mainNode
    
    QBankA --> Results[Results Page]:::mainNode
    QBankB --> Results
    QBankC --> Results
    
    Results --> ReviewDetail[Detailed Review]:::actionNode
    ReviewDetail --> Review[Review Analysis]:::mainNode
    Results --> TestKnowledge[Test Knowledge Button]:::actionNode
    TestKnowledge --> MockTest[Mock Test]:::mainNode
    
    MockTest --> TestResults[Test Results]:::mainNode
    TestResults --> ProgressUpdate[Progress Update]:::pathNode
    ProgressUpdate --> Dashboard
    
    TestResults --> ReviewWeakAreas[Review Weak Areas]:::actionNode
    ReviewWeakAreas --> TargetedCourse[Targeted Course Content]:::mainNode
    TargetedCourse --> Dashboard

    subgraph "Learning Path Indicator"
        LP1[Dashboard]
        LP2[Course]
        LP3[Practice]
        LP4[Review]
        LP5[Test]
        LP1 --- LP2 --- LP3 --- LP4 --- LP5
    end
```

## Profile Navigation - Optimized Flow

```mermaid
graph TD
    classDef mainView fill:#bbdefb,stroke:#1976d2,stroke-width:2px;
    classDef actionNode fill:#fff9c4,stroke:#fbc02d,stroke-width:1px;
    classDef contentNode fill:#e1bee7,stroke:#8e24aa,stroke-width:1px;
    
    Profile[Profile Page]:::mainView --> ProgressiveTabs[Progressive Loading Tabs]:::mainView
    
    ProgressiveTabs --> Overview[Overview Tab]:::mainView
    ProgressiveTabs --> Reading[Reading Tab]:::mainView
    ProgressiveTabs --> Writing[Writing Tab]:::mainView
    ProgressiveTabs --> Math[Math Tab]:::mainView
    
    Overview --> SimpleCards[Simple Card Grid]:::contentNode
    SimpleCards --> EditToggle[Edit Mode Toggle]:::actionNode
    EditToggle --> DnDGrid[Drag and Drop Grid]:::contentNode
    DnDGrid --> SaveLayout[Save Layout]:::actionNode
    SaveLayout --> SimpleCards
    
    SimpleCards --> ReadingCard[Reading Summary Card]:::contentNode
    SimpleCards --> WritingCard[Writing Summary Card]:::contentNode
    SimpleCards --> MathCard[Math Summary Card]:::contentNode
    
    ReadingCard --> ReadingLink[Direct Link to Reading Tab]:::actionNode
    WritingCard --> WritingLink[Direct Link to Writing Tab]:::actionNode
    MathCard --> MathLink[Direct Link to Math Tab]:::actionNode
    
    ReadingLink --> Reading
    WritingLink --> Writing
    MathLink --> Math
    
    Reading --> ReadingSkills[Reading Skills Chart]:::contentNode
    Reading --> ReadingProgress[Reading Progress Chart]:::contentNode
    
    Writing --> WritingSkills[Writing Skills Chart]:::contentNode
    Writing --> WritingProgress[Writing Progress Chart]:::contentNode
    
    Math --> MathSkills[Math Skills Chart]:::contentNode
    Math --> MathProgress[Math Progress Chart]:::contentNode
    
    ReadingSkills --> RelatedWriting[Link to Related Writing Skills]:::actionNode
    WritingSkills --> RelatedMath[Link to Related Math Skills]:::actionNode
    MathSkills --> RelatedReading[Link to Related Reading Skills]:::actionNode
    
    RelatedWriting --> WritingSkills
    RelatedMath --> MathSkills
    RelatedReading --> ReadingSkills
    
    Reading --> BackToOverview1[Back to Overview]:::actionNode
    Writing --> BackToOverview2[Back to Overview]:::actionNode
    Math --> BackToOverview3[Back to Overview]:::actionNode
    
    BackToOverview1 --> Overview
    BackToOverview2 --> Overview
    BackToOverview3 --> Overview
```

## Card Management System - Optimized Flow

```mermaid
flowchart TD
    classDef viewMode fill:#c8e6c9,stroke:#388e3c,stroke-width:1px;
    classDef editMode fill:#ffecb3,stroke:#ffa000,stroke-width:2px;
    classDef serverComponent fill:#bbdefb,stroke:#1976d2,stroke-width:1px;
    classDef clientComponent fill:#e1bee7,stroke:#8e24aa,stroke-width:1px;
    
    PageLoad[Profile Page Load] --> IsHydrated{Is Client Hydrated?}
    IsHydrated -- No --> ServerRender[Server-Side Render]:::serverComponent
    ServerRender --> SimpleCardGrid[Simple Card Grid]:::viewMode
    
    IsHydrated -- Yes --> IsEditMode{Is Edit Mode?}
    IsEditMode -- No --> SimpleCardGrid
    IsEditMode -- Yes --> ClientOnly[Client-Only Wrapper]:::clientComponent
    ClientOnly --> DraggableGrid[Draggable Card Grid]:::editMode
    
    SimpleCardGrid --> ViewCards[View Cards]:::viewMode
    SimpleCardGrid --> CardClick[Click Card for Details]:::viewMode
    SimpleCardGrid --> EnableEdit[Enable Edit Mode Button]:::viewMode
    
    EnableEdit --> ToggleEdit[Toggle Edit Mode]
    ToggleEdit --> IsEditMode
    
    DraggableGrid --> DragCards[Drag Cards to Reposition]:::editMode
    DraggableGrid --> SaveButton[Save Layout Button]:::editMode
    DraggableGrid --> CancelButton[Cancel Button]:::editMode
    
    SaveButton --> SaveLayout[Save Layout to User Preferences]
    SaveLayout --> ToggleEdit
    
    CancelButton --> RevertChanges[Revert to Original Layout]
    RevertChanges --> ToggleEdit
```

## Data Loading and State Management - Optimized Flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as Profile Page
    participant C as Tab Container
    participant API as API Layer
    participant CS as Client Storage
    
    U->>P: Navigate to Profile
    P->>API: Fetch Basic Profile Data
    API-->>P: Return Overview Data
    P->>U: Display Profile Overview
    
    U->>C: Click Reading Tab
    C->>P: Request Tab Change
    
    P->>CS: Check for Cached Data
    alt Has cached data
        CS-->>P: Return Cached Reading Data
        P->>U: Display Reading Tab (Cached)
        P->>API: Fetch Fresh Reading Data
        API-->>P: Return Fresh Reading Data
        P->>CS: Update Cache
        P->>U: Update Reading Tab (Fresh)
    else No cached data
        P->>U: Display Reading Tab Skeleton
        P->>API: Fetch Reading Data
        API-->>P: Return Reading Data
        P->>CS: Cache Reading Data
        P->>U: Display Reading Tab (Fresh)
    end
    
    Note over P,API: Prefetch Related Data
    P->>API: Prefetch Writing Data (Low Priority)
    API-->>P: Return Writing Data
    P->>CS: Cache Writing Data
    
    U->>C: Click Writing Tab
    C->>P: Request Tab Change
    P->>CS: Retrieve Cached Writing Data
    CS-->>P: Return Cached Writing Data
    P->>U: Display Writing Tab (Instant)
```

## Performance Optimization Flow

```mermaid
graph TD
    classDef initialLoad fill:#bbdefb,stroke:#1976d2,stroke-width:2px;
    classDef lazyLoad fill:#c8e6c9,stroke:#388e3c,stroke-width:1px;
    classDef userAction fill:#fff9c4,stroke:#fbc02d,stroke-width:1px;
    
    PageLoad[Initial Page Load]:::initialLoad --> CriticalCSS[Load Critical CSS]:::initialLoad
    CriticalCSS --> ShellRender[Render App Shell]:::initialLoad
    ShellRender --> AboveFold[Load Above-Fold Content]:::initialLoad
    AboveFold --> Hydrate[Hydration]:::initialLoad
    
    Hydrate --> InteractiveShell[Interactive Shell]:::initialLoad
    InteractiveShell --> LazyComponents[Lazy-load Components]:::lazyLoad
    
    LazyComponents --> InView1{In Viewport?}
    InView1 -- Yes --> LoadChart1[Load First Chart]:::lazyLoad
    InView1 -- No --> WaitForScroll1[Wait]
    
    ScrollAction1[User Scrolls]:::userAction --> WaitForScroll1
    WaitForScroll1 --> InView1
    
    LoadChart1 --> InView2{Next Chart In Viewport?}
    InView2 -- Yes --> LoadChart2[Load Second Chart]:::lazyLoad
    InView2 -- No --> WaitForScroll2[Wait]
    
    ScrollAction2[User Scrolls Again]:::userAction --> WaitForScroll2
    WaitForScroll2 --> InView2
    
    InteractiveShell --> Prefetch[Prefetch Likely Next Routes]:::lazyLoad
    
    TabClick[User Clicks Tab]:::userAction --> HasCachedData{Has Cached Data?}
    HasCachedData -- Yes --> ShowCached[Show Cached Data]:::lazyLoad
    HasCachedData -- No --> ShowSkeleton[Show Skeleton]:::lazyLoad
    
    ShowCached --> FetchFresh[Fetch Fresh Data]:::lazyLoad
    ShowSkeleton --> FetchFresh
    FetchFresh --> UpdateView[Update View]:::lazyLoad
