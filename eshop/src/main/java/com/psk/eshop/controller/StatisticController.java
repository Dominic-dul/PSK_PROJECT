package com.psk.eshop.controller;

import com.psk.eshop.dto.StatisticRequestDTO;
import com.psk.eshop.model.Statistic;
import com.psk.eshop.service.StatisticService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/e-shop")
@CrossOrigin("*")
@AllArgsConstructor
public class StatisticController {
    private final StatisticService statisticService;
    @PostMapping(value = "/statistic")
    public Statistic add(@RequestBody StatisticRequestDTO statisticRequest){
        return statisticService.createStatistic(statisticRequest);
    }

    @GetMapping("/statistics")
    public List<Statistic> getStatistics(){
        return statisticService.getStatistics();
    }

    @GetMapping("/statistic/{statisticId}")
    public Statistic getStatisticById(@PathVariable Long statisticId){
        return statisticService.getStatisticById(statisticId);
    }

    @PutMapping("/statistic/{statisticId}")
    public Statistic update(@PathVariable Long statisticId, @RequestBody StatisticRequestDTO statisticRequest){
        return statisticService.updateStatistic(statisticId, statisticRequest);
    }
    @DeleteMapping("/statistic/{statisticId}")
    public void deleteStatisticById(@PathVariable Long statisticId)
    {
        statisticService.deleteStatisticById(statisticId);
    }
}
