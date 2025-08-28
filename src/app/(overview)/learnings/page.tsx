// // app/learn/[algoID]/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   Button,
//   Badge,
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
//   Progress,
//   Alert,
//   AlertDescription,
// } from '@/components/ui/shadcn';
// import {
//   BookOpen,
//   Brain,
//   Clock,
//   Zap,
//   CheckCircle,
//   ArrowRight,
//   Play,
//   Code,
//   TrendingUp,
//   Target,
//   Lightbulb,
//   Users,
//   Star,
//   Lock,
// } from 'lucide-react';
// import { Algorithm } from '@/types/algorithm';
// import { enhancedAlgorithms } from '@/data/enhanced-algorithms';

// interface LearningProgress {
//   algoID: string;
//   completed: boolean;
//   timeSpent: number;
//   lastVisited: string;
// }

// export default function LearningPage() {
//   const params = useParams();
//   const router = useRouter();
//   const algoID = params.algoID as string;
  
//   const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);
//   const [progress, setProgress] = useState<LearningProgress | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [readingProgress, setReadingProgress] = useState(0);

//   useEffect(() => {
//     // Fetch algorithm data
//     const algoData = enhancedAlgorithms.find(algo => algo.algoID === algoID);
//     setAlgorithm(algoData || null);
    
//     // Fetch user progress (replace with actual API call)
//     const savedProgress = localStorage.getItem(`progress_${algoID}`);
//     if (savedProgress) {
//       setProgress(JSON.parse(savedProgress));
//     } else {
//       setProgress({
//         algoID,
//         completed: false,
//         timeSpent: 0,
//         lastVisited: new Date().toISOString(),
//       });
//     }
    
//     setLoading(false);
//   }, [algoID]);

//   const handleStartSocraticLearning = () => {
//     if (!algorithm) return;
    
//     // Check if access is available
//     if (algorithm.access === 'PRO' || algorithm.access === 'MASTER') {
//       // Handle subscription check here
//       // For now, we'll proceed
//     }
    
//     router.push(`/socratic-ai/${algorithm.algoID}`);
//   };

//   const markAsCompleted = () => {
//     if (!progress || !algorithm) return;
    
//     const updatedProgress: LearningProgress = {
//       ...progress,
//       completed: true,
//       lastVisited: new Date().toISOString(),
//     };
    
//     setProgress(updatedProgress);
//     localStorage.setItem(`progress_${algoID}`, JSON.stringify(updatedProgress));
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!algorithm) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Algorithm Not Found</h1>
//         <Button onClick={() => router.push('/algorithms')}>
//           Back to Algorithms
//         </Button>
//       </div>
//     );
//   }

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
//       case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//       case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
//       default: return 'bg-gray-100 text-gray-800 border-gray-300';
//     }
//   };

//   const getAccessColor = (access: string) => {
//     switch (access) {
//       case 'FREE': return 'bg-blue-100 text-blue-800 border-blue-300';
//       case 'PRO': return 'bg-purple-100 text-purple-800 border-purple-300';
//       case 'MASTER': return 'bg-gold-100 text-gold-800 border-gold-300';
//       default: return 'bg-gray-100 text-gray-800 border-gray-300';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Header Section */}
//       <div className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button
//                 variant="ghost"
//                 onClick={() => router.back()}
//                 className="flex items-center space-x-2"
//               >
//                 <ArrowRight className="w-4 h-4 rotate-180" />
//                 <span>Back</span>
//               </Button>
//               <div className="h-6 w-px bg-gray-300" />
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">{algorithm.title}</h1>
//                 <p className="text-gray-600 mt-1">{algorithm.description}</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Badge className={getDifficultyColor(algorithm.difficulty)}>
//                 {algorithm.difficulty}
//               </Badge>
//               <Badge className={getAccessColor(algorithm.access)}>
//                 {algorithm.access === 'FREE' ? (
//                   <span className="flex items-center space-x-1">
//                     <span>FREE</span>
//                   </span>
//                 ) : (
//                   <span className="flex items-center space-x-1">
//                     <Lock className="w-3 h-3" />
//                     <span>{algorithm.access}</span>
//                   </span>
//                 )}
//               </Badge>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Progress Bar */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-700">Learning Progress</span>
//             <span className="text-sm text-gray-500">
//               {progress?.completed ? 'Completed' : 'In Progress'}
//             </span>
//           </div>
//           <Progress value={progress?.completed ? 100 : readingProgress} className="h-2" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Summary Card */}
//             <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
//               <CardHeader>
//                 <div className="flex items-center space-x-2">
//                   <BookOpen className="w-5 h-5 text-blue-600" />
//                   <CardTitle className="text-blue-900">Algorithm Overview</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700 text-lg leading-relaxed">
//                   {algorithm.content.summary}
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Detailed Explanation Tabs */}
//             <Card className="shadow-lg border-0">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Target className="w-5 h-5 text-purple-600" />
//                   <span>Deep Dive</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Tabs defaultValue="explanation" className="w-full">
//                   <TabsList className="grid w-full grid-cols-4">
//                     <TabsTrigger value="explanation">How It Works</TabsTrigger>
//                     <TabsTrigger value="complexity">Complexity</TabsTrigger>
//                     <TabsTrigger value="pros-cons">Pros & Cons</TabsTrigger>
//                     <TabsTrigger value="applications">Applications</TabsTrigger>
//                   </TabsList>
                  
//                   <TabsContent value="explanation" className="mt-6">
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="text-lg font-semibold mb-3">Algorithm Steps</h3>
//                         <div className="space-y-3">
//                           {algorithm.content.explanation.howItWorks.map((step, index) => (
//                             <div key={index} className="flex items-start space-x-3">
//                               <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
//                                 {index + 1}
//                               </div>
//                               <p className="text-gray-700">{step}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
                      
//                       {algorithm.content.explanation.visualExample && (
//                         <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                           <h4 className="font-semibold text-blue-900 mb-2">Visual Analogy</h4>
//                           <p className="text-blue-800">{algorithm.content.explanation.visualExample}</p>
//                         </div>
//                       )}

//                       <div>
//                         <h3 className="text-lg font-semibold mb-3">Pseudocode</h3>
//                         <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
//                           <pre className="text-sm">
//                             <code>{algorithm.content.explanation.pseudocode}</code>
//                           </pre>
//                         </div>
//                       </div>
//                     </div>
//                   </TabsContent>
                  
//                   <TabsContent value="complexity" className="mt-6">
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="text-lg font-semibold mb-4">Time Complexity</h3>
//                         <div className="grid grid-cols-3 gap-4">
//                           <div className="bg-green-50 p-4 rounded-lg border border-green-200">
//                             <h4 className="font-semibold text-green-900">Best Case</h4>
//                             <p className="text-2xl font-bold text-green-600 mt-2">
//                               {algorithm.content.explanation.timeComplexity.best}
//                             </p>
//                           </div>
//                           <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//                             <h4 className="font-semibold text-yellow-900">Average Case</h4>
//                             <p className="text-2xl font-bold text-yellow-600 mt-2">
//                               {algorithm.content.explanation.timeComplexity.average}
//                             </p>
//                           </div>
//                           <div className="bg-red-50 p-4 rounded-lg border border-red-200">
//                             <h4 className="font-semibold text-red-900">Worst Case</h4>
//                             <p className="text-2xl font-bold text-red-600 mt-2">
//                               {algorithm.content.explanation.timeComplexity.worst}
//                             </p>
//                           </div>
//                         </div>
//                         <p className="text-gray-700 mt-4">
//                           {algorithm.content.explanation.timeComplexity.explanation}
//                         </p>
//                       </div>
                      
//                       <div>
//                         <h3 className="text-lg font-semibold mb-2">Space Complexity</h3>
//                         <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
//                           <p className="text-purple-800">{algorithm.content.explanation.spaceComplexity}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </TabsContent>
                  
//                   <TabsContent value="pros-cons" className="mt-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <h3 className="text-lg font-semibold mb-4 text-green-700">Advantages</h3>
//                         <div className="space-y-3">
//                           {algorithm.content.explanation.advantages.map((advantage, index) => (
//                             <div key={index} className="flex items-start space-x-2">
//                               <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                               <p className="text-gray-700">{advantage}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold mb-4 text-red-700">Disadvantages</h3>
//                         <div className="space-y-3">
//                           {algorithm.content.explanation.disadvantages.map((disadvantage, index) => (
//                             <div key={index} className="flex items-start space-x-2">
//                               <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 flex-shrink-0">
//                                 <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                               </div>
//                               <p className="text-gray-700">{disadvantage}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </TabsContent>
                  
//                   <TabsContent value="applications" className="mt-6">
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="text-lg font-semibold mb-4">Real-World Applications</h3>
//                         <div className="grid grid-cols-1 gap-3">
//                           {algorithm.content.explanation.realWorldApplications.map((application, index) => (
//                             <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200 flex items-center space-x-3">
//                               <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                               <p className="text-blue-800">{application}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
                      
//                       <div>
//                         <h3 className="text-lg font-semibold mb-4">Related Algorithms</h3>
//                         <div className="flex flex-wrap gap-2">
//                           {algorithm.content.explanation.relatedAlgorithms.map((related, index) => (
//                             <Badge key={index} variant="outline" className="text-purple-600 border-purple-300">
//                               {related}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>

//             {/* Images Section */}
//             {algorithm.content.images && algorithm.content.images.length > 0 && (
//               <Card className="shadow-lg border-0">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Star className="w-5 h-5 text-yellow-500" />
//                     <span>Visual Learning</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {algorithm.content.images.map((image, index) => (
//                       <div key={index} className="space-y-2">
//                         <div className="relative aspect-video rounded-lg overflow-hidden border">
//                           <Image
//                             src={image.url}
//                             alt={image.alt}
//                             fill
//                             className="object-cover"
//                             placeholder="blur"
//                             blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyrmrZ3ZUHgBWMThFXJ4bUcwjQTEUokQqRMaEqBb+7uf0AjI4//2Q=="
//                           />
//                         </div>
//                         {image.caption && (
//                           <p className="text-sm text-gray-600 text-center">{image.caption}</p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Algorithm Stats */}
//             <Card className="shadow-lg border-0">
//               <CardHeader>
//                 <CardTitle className="text-lg">Quick Stats</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <Clock className="w-4 h-4 text-gray-500" />
//                     <span className="text-sm text-gray-600">Time Complexity</span>
//                   </div>
//                   <Badge variant="outline">{algorithm.timeComplexity}</Badge>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <TrendingUp className="w-4 h-4 text-gray-500" />
//                     <span className="text-sm text-gray-600">Difficulty</span>
//                   </div>
//                   <Badge className={getDifficultyColor(algorithm.difficulty)}>
//                     {algorithm.difficulty}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <Zap className="w-4 h-4 text-gray-500" />
//                     <span className="text-sm text-gray-600">Category</span>
//                   </div>
//                   <Badge variant="outline">{algorithm.label}</Badge>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* AI Learning Section */}
//             <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-blue-50">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2 text-purple-800">
//                   <Brain className="w-5 h-5" />
//                   <span>Socratic AI Learning</span>
//                 </CardTitle>
//                 <CardDescription>
//                   Master this algorithm through interactive AI-guided learning
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {!progress?.completed && (
//                   <Alert className="border-orange-200 bg-orange-50">
//                     <Lightbulb className="w-4 h-4 text-orange-600" />
//                     <AlertDescription className="text-orange-800">
//                       Complete the AI learning session to master this algorithm
//                     </AlertDescription>
//                   </Alert>
//                 )}
                
//                 <Button
//                   onClick={handleStartSocraticLearning}
//                   className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
//                   size="lg"
//                 >
//                   <Play className="w-4 h-4 mr-2" />
//                   {progress?.completed ? 'Review with AI' : 'Start AI Learning'}
//                 </Button>
                
//                 {progress?.completed && (
//                   <div className="flex items-center space-x-2 text-green-600">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm font-medium">Algorithm Completed</span>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Progress Card */}
//             <Card className="shadow-lg border-0">
//               <CardHeader>
//                 <CardTitle className="text-lg">Your Progress</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Completion Status</span>
//                     <span>{progress?.completed ? '100%' : '0%'}</span>
//                   </div>
//                   <Progress value={progress?.completed ? 100 : 0} />
//                 </div>
                
//                 {progress?.timeSpent && progress.timeSpent > 0 && (
//                   <div className="text-sm text-gray-600">
//                     Time spent: {Math.round(progress.timeSpent / 60)} minutes
//                   </div>
//                 )}
                
//                 {!progress?.completed && (
//                   <Button
//                     onClick={markAsCompleted}
//                     variant="outline"
//                     size="sm"
//                     className="w-full"
//                   >
//                     Mark as Read
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Next Steps */}
//             <Card className="shadow-lg border-0">
//               <CardHeader>
//                 <CardTitle className="text-lg">Next Steps</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start"
//                   onClick={() => router.push('/practice')}
//                 >
//                   <Code className="w-4 h-4 mr-2" />
//                   Practice Problems
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start"
//                   onClick={() => router.push('/algorithms')}
//                 >
//                   <BookOpen className="w-4 h-4 mr-2" />
//                   More Algorithms
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// // types/algorithm.ts
// export interface AlgorithmContent {
//   summary: string;
//   explanation: {
//     overview: string;
//     howItWorks: string[];
//     visualExample?: string;
//     pseudocode: string;
//     timeComplexity: {
//       best: string;
//       average: string;
//       worst: string;
//       explanation: string;
//     };
//     spaceComplexity: string;
//     advantages: string[];
//     disadvantages: string[];
//     realWorldApplications: string[];
//     relatedAlgorithms: string[];
//   };
//   images?: {
//     url: string;
//     alt: string;
//     caption?: string;
//   }[];
// }

// export interface Algorithm {
//   algoID: string;
//   title: string;
//   description: string;
//   difficulty: "Easy" | "Medium" | "Hard";
//   label: string;
//   category: string;
//   timeComplexity: string;
//   access: "FREE" | "PRO" | "MASTER";
//   content: AlgorithmContent;
// }


// // data/enhanced-algorithms.ts
// export const enhancedAlgorithms: Algorithm[] = [
//   {
//     algoID: "Algo001",
//     title: "Bubble Sort",
//     description: "Simple comparison-based sorting.",
//     difficulty: "Easy",
//     label: "Sorting",
//     category: "sorting",
//     timeComplexity: "O(n^2)",
//     access: "FREE",
//     content: {
//       summary: "Bubble Sort is one of the simplest sorting algorithms to understand and implement. It repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. The process is repeated until the list is sorted.",
//       explanation: {
//         overview: "Bubble Sort works by repeatedly comparing adjacent elements in the array and swapping them if they're in the wrong order. This process continues until no more swaps are needed, indicating the array is sorted.",
//         howItWorks: [
//           "Start with the first element of the array",
//           "Compare it with the next element",
//           "If the first element is greater than the second, swap them",
//           "Continue this process for all adjacent pairs",
//           "Repeat the entire process until no swaps are made in a complete pass",
//           "The largest element 'bubbles up' to its correct position in each pass"
//         ],
//         visualExample: "Imagine bubbles in water rising to the surface - the largest elements gradually move to their correct positions at the end of the array.",
//         pseudocode: `
// ALGORITHM BubbleSort(arr)
//   n = length(arr)
  
//   FOR i = 0 TO n-1
//     swapped = false
    
//     FOR j = 0 TO n-i-2
//       IF arr[j] > arr[j+1]
//         SWAP(arr[j], arr[j+1])
//         swapped = true
//       END IF
//     END FOR
    
//     IF swapped == false
//       BREAK
//     END IF
//   END FOR
  
//   RETURN arr
// END ALGORITHM`,
//         timeComplexity: {
//           best: "O(n)",
//           average: "O(n²)",
//           worst: "O(n²)",
//           explanation: "Best case occurs when array is already sorted (O(n) with optimization). Average and worst cases require nested loops, resulting in O(n²) comparisons."
//         },
//         spaceComplexity: "O(1) - Only uses a constant amount of additional space",
//         advantages: [
//           "Simple to understand and implement",
//           "No additional memory space needed (in-place sorting)",
//           "Stable sorting algorithm",
//           "Can detect if the list is already sorted"
//         ],
//         disadvantages: [
//           "Poor time complexity - O(n²) in average and worst cases",
//           "Not suitable for large datasets",
//           "More efficient algorithms are available"
//         ],
//         realWorldApplications: [
//           "Educational purposes for teaching sorting concepts",
//           "Small datasets where simplicity is preferred over efficiency",
//           "Situations where stable sorting is required with minimal memory"
//         ],
//         relatedAlgorithms: [
//           "Selection Sort",
//           "Insertion Sort",
//           "Cocktail Shaker Sort"
//         ]
//       },
//       images: [
//         {
//           url: "/images/algorithms/bubble-sort-visualization.gif",
//           alt: "Bubble Sort Visualization",
//           caption: "Visual representation of Bubble Sort algorithm in action"
//         },
//         {
//           url: "/images/algorithms/bubble-sort-complexity.png",
//           alt: "Bubble Sort Time Complexity Chart",
//           caption: "Time complexity comparison of Bubble Sort with other algorithms"
//         }
//       ]
//     }
//   }
//   // Add more algorithms with similar structure
// ];
